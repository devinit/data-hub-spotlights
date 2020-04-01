import React, { FunctionComponent } from 'react';
import Popup from 'reactjs-popup';
import { SpotlightPopupContent } from './SpotlightPopupContent';

interface SpotlightPopupProps {
  description?: string;
  source?: string;
}

const SpotlightPopup: FunctionComponent<SpotlightPopupProps> = props => {
  const hideAllPopups = (): void => {
    const popups = document.querySelectorAll('.popup-content ');
    popups.forEach(function(popup) {
      popup.setAttribute('style', 'display:none;');
    });
  };
  const popUpContentStyles = {
    maxWidth: '250px',
    background: '#fff',
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: '12px',
    color: '#60575d',
    borderRadius: '0.28571429rem',
    boxShadow: '0 2px 4px 0 rgba(34, 36, 38, 0.12), 0 2px 10px 0 rgba(34, 36, 38, 0.15)'
  };
  const customArrowStyle = {
    left: '175px'
  };

  return (
    <Popup
      trigger={
        <span className="spotlight__stat-icon">
          <i onClick={hideAllPopups} role="presentation" aria-hidden="true" className="ico ico--12 ico-info-slate"></i>
          <style jsx>{`
            .spotlight__stat-icon {
              display: inline-block;
              margin-left: 10px;
              cursor: pointer;
            }
          `}</style>
        </span>
      }
      offsetX={20}
      arrowStyle={customArrowStyle}
      position="top right"
      closeOnDocumentClick
      contentStyle={popUpContentStyles}
    >
      {(close): React.ReactElement => (
        <SpotlightPopupContent close={close} description={props.description} source={props.source} />
      )}
    </Popup>
  );
};
export { SpotlightPopup };
