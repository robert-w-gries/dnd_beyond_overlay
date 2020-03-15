import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { parseBeyondStatus, parseBeyondSheet } from '../../utils/parseBeyondSheet';

const BEYOND_MAX_RETRIES = 15;

function BeyondLoader(props) {
  const { currentProfile, onBeyondError, onBeyondLoaded } = props;
  if (!currentProfile) {
    return null;
  }

  const url = `https://www.dndbeyond.com/characters/${currentProfile.id}`;
  return (
    <BeyondFrame
      url={url}
      onBeyondLoaded={onBeyondLoaded}
      onBeyondError={onBeyondError}
    />
  );
}

BeyondLoader.propTypes = {
  onBeyondError: PropTypes.func.isRequired,
  onBeyondLoaded: PropTypes.func.isRequired,
  selectedProfile: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

BeyondLoader.defaultProps = {
  selectedProfile: {
    avatar: '',
    id: null,
    level: null,
    name: '',
  },
};

function BeyondFrame(props) {
  const { onBeyondLoaded, onBeyondError, url } = props;

  const frameRef = useRef();

  // There are two instances of loading:
  // 1) The `iframe` fetches the `dndbeyond.com/characters/id` page
  // 2) The page dynamically loads character sheet data
  // We need to ensure that step 2 is finished before attempting to parse
  async function checkSheetLoaded() {
    const sheetResult = {
      success: false,
      data: null,
      errorMsg: '',
    };

    const frameDocument = frameRef.current.contentDocument;

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
      throw new Error('Sheet still loading');
    }

    return sheetResult;
  }

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const getLoadingResult = async () => {
    for (let attempt = 1; attempt <= BEYOND_MAX_RETRIES; attempt += 1) {
      try {
        return await checkSheetLoaded();
      } catch (err) {
        console.log(attempt);
        await sleep(500);
      }
    }
    throw new Error('Could not reach DnD Beyond');
  };

  return (
    <iframe
      is="x-frame-bypass"
      title="charSheet"
      sandbox="allow-scripts allow-same-origin"
      src={url}
      ref={frameRef}
      onLoad={() => onBeyondLoaded(getLoadingResult())}
    />
  );
}

BeyondFrame.propTypes = {
  onBeyondError: PropTypes.func.isRequired,
  onBeyondLoaded: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default BeyondLoader;
