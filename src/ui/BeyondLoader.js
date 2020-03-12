import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { parseBeyondStatus, parseBeyondSheet } from './utils/parseBeyondSheet';

function BeyondLoader(props) {
  const { onBeyondError, onBeyondLoaded, selectedProfile } = props;
  if (!selectedProfile.id) {
    return null;
  }

  const url = `https://www.dndbeyond.com/characters/${selectedProfile.id}`;
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
    level: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

BeyondLoader.defaultProps = {
  selectedProfile: {
    avatar: '',
    id: null,
    level: '',
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
  const checkSheetLoaded = (retries) => {
    if (!retries || retries < 0) {
      onBeyondError('Could not reach DnD Beyond.');
      return;
    }

    const frameDocument = frameRef.current.contentDocument;

    const beyondStatus = parseBeyondStatus(frameDocument);
    if (beyondStatus === 'loaded') {
      let sheetData;
      try {
        sheetData = parseBeyondSheet(frameDocument);
      } catch (err) {
        onBeyondError('Could not parse character sheet data.');
        throw err;
      }
      onBeyondLoaded(sheetData);
    } else if (beyondStatus === 'failed') {
      onBeyondError('DnD Beyond failed to load character sheet data.');
    } else {
      setTimeout(() => {
        checkSheetLoaded(retries - 1);
      }, 500, frameDocument);
    }
  };

  return (
    <iframe
      is="x-frame-bypass"
      title="charSheet"
      sandbox="allow-scripts allow-same-origin"
      src={url}
      ref={frameRef}
      onLoad={() => checkSheetLoaded(10)}
    />
  );
}

BeyondFrame.propTypes = {
  onBeyondError: PropTypes.func.isRequired,
  onBeyondLoaded: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default BeyondLoader;
