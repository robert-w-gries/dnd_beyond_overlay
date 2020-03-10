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
      onBeyondError={() => { onBeyondError(); }}
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

  const checkSheetLoaded = () => {
    const frameDocument = frameRef.current.contentDocument;

    const beyondStatus = parseBeyondStatus(frameDocument);
    if (beyondStatus === 'loaded') {
      const sheetData = parseBeyondSheet(frameDocument);
      onBeyondLoaded(sheetData);
    } else if (beyondStatus === 'failed') {
      onBeyondError();
    } else {
      setTimeout(() => {
        checkSheetLoaded();
      }, 500, frameDocument);
    }
  };

  return (
    <iframe is="x-frame-bypass" title="charSheet" src={url} ref={frameRef} onError={onBeyondError} onLoad={checkSheetLoaded} />
  );
}

BeyondFrame.propTypes = {
  onBeyondError: PropTypes.func.isRequired,
  onBeyondLoaded: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default BeyondLoader;
