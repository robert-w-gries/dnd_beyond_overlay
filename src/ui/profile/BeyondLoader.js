import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { parseBeyondStatus, parseBeyondSheet } from '../../utils/parseBeyondSheet';

const BEYOND_MAX_RETRIES = 0;

function BeyondLoader(props) {
  const { currentProfile, onBeyondLoaded } = props;
  if (!currentProfile) {
    return null;
  }

  const url = `https://www.dndbeyond.com/characters/${currentProfile.id}`;
  return (
    <BeyondFrame
      url={url}
      onBeyondLoaded={onBeyondLoaded}
    />
  );
}

BeyondLoader.propTypes = {
  onBeyondLoaded: PropTypes.func.isRequired,
  currentProfile: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

BeyondLoader.defaultProps = {
  currentProfile: {
    avatar: '',
    id: null,
    level: null,
    name: '',
  },
};

// There are two instances of loading:
// 1) The `iframe` fetches the `dndbeyond.com/characters/id` page
// 2) The page dynamically loads character sheet data
// We need to ensure that step 2 is finished before attempting to parse
async function checkSheetLoaded(frameDocument) {
  const sheetResult = {
    success: false,
    data: null,
    errorMsg: '',
  };

  const beyondStatus = parseBeyondStatus(frameDocument);
  if (beyondStatus === 'failed') {
    sheetResult.errorMsg = 'Could not parse character sheet data.';
  } else if (beyondStatus === 'loaded') {
    try {
      sheetResult.success = true;
      sheetResult.data = parseBeyondSheet(frameDocument);
    } catch (err) {
      sheetResult.errorMsg = 'Could not parse character sheet data.';
    }
  } else {
    throw new Error('RETRY');
  }

  return sheetResult;
}

function BeyondFrame(props) {
  const { onBeyondLoaded, url } = props;

  const frameRef = useRef();

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const getLoadingResult = async () => {
    for (let attempt = 1; attempt <= BEYOND_MAX_RETRIES; attempt += 1) {
      try {
        // eslint-disable-next-line no-await-in-loop
        return await checkSheetLoaded(frameRef.current.contentDocument);
      } catch (err) {
        if (err.message === 'RETRY') {
          // eslint-disable-next-line no-await-in-loop
          await sleep(500);
        } else {
          throw err;
        }
      }
    }
    throw new Error('Could not reach DnD Beyond');
  };

  useEffect(() => {
    frameRef.current.onload = () => {
      // prevent issue of onload() being called twice
      // https://stackoverflow.com/a/15880489
      frameRef.current.onload = null;
      onBeyondLoaded(getLoadingResult());
    };
  }, []);

  return (
    <iframe
      is="x-frame-bypass"
      title="charSheet"
      sandbox="allow-scripts allow-same-origin"
      src={url}
      ref={frameRef}
    />
  );
}

BeyondFrame.propTypes = {
  onBeyondLoaded: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default BeyondLoader;
