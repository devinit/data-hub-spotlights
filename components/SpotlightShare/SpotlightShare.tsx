import React, { FunctionComponent, useState } from 'react';
import Modal from 'react-modal';
import { SpotlightLocation, toCamelCase } from '../../utils';
import { AnchorButton } from '../AnchorButton';
import { SocialLink } from '../SocialLink';
import { getShortUrl } from './utils';

interface SpotlightShareProps {
  buttonCaption?: string;
  location?: SpotlightLocation;
  countryName: string;
}

const SpotlightShare: FunctionComponent<SpotlightShareProps> = ({ buttonCaption, ...props }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [url, setUrl] = useState('');
  const toggleModalOpen = (): void => {
    if (!modalOpen) {
      getShortUrl()
        .then(url => setUrl(url.link))
        .catch(error => console.log('Error while generating short URL: ', error.message));
    }
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <AnchorButton onClick={toggleModalOpen}>{buttonCaption}</AnchorButton>
      <Modal
        isOpen={modalOpen}
        onRequestClose={toggleModalOpen}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
        className="modal__content modal__content--minor"
        overlayClassName="modal modal--share modal--share-open"
      >
        <form className="form">
          <h2 className="modal__heading">Share this visualisation</h2>
          <br />
          <label htmlFor="one" className="form-label">
            <input type="radio" id="one" name="first_item" value="1" className="form-field__radio-buttons form-radio" />
            In default view
          </label>
          <label htmlFor="two" className="form-label">
            <input
              type="radio"
              id="two"
              name="second_item"
              value="2"
              className="form-field__radio-buttons form-radio"
            />
            As I configured it
          </label>
          <br />
          <input className="form-item" type="text" id="urllink" name="urllink" value={url} />
          <br />
          <br />
          <SocialLink socialSource="twitter" url={'https://twitter.com/intent/tweet?text=' + url} />
          <SocialLink socialSource="facebook" url={'https://facebook.com/share.php?u=' + url} />
          <SocialLink
            socialSource="email"
            url={
              'mailto:?subject=Development Initiatives: ' +
              toCamelCase(props.location ? props.location.name : props.countryName) +
              '&body=Development Initiatives:' +
              toCamelCase(props.location ? props.location.name : props.countryName) +
              '%0A%0A' +
              url
            }
          />
        </form>
        <button className="modal-button-close js-modal-trigger" onClick={toggleModalOpen}>
          x
        </button>
      </Modal>
      <style jsx>{`
        input[type='radio'] {
          margin-right: 1em !important;
        }
      `}</style>
    </>
  );
};

SpotlightShare.defaultProps = {
  buttonCaption: 'Share this visualisation'
};

export { SpotlightShare };
