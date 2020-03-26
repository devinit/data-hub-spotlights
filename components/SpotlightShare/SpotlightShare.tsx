import React, { FunctionComponent, useState } from 'react';
import Modal from 'react-modal';
import { Button } from '../Button';
import { SocialLink } from '../SocialLink';

interface SpotlightShareProps {
  maxHeight?: string;
  minHeight?: string;
  className?: string;
  urlValue?: string;
}

const SpotlightShare: FunctionComponent<SpotlightShareProps> = ({ urlValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <Button onClick={toggleModal}>Share visualisation</Button>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
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
          <input className="form-item" type="text" id="urllink" name="urllink" value={urlValue} />
          <br />
          <br />
          <SocialLink socialSource="twitter" url="https://twitter.com" />
          <SocialLink socialSource="facebook" url="https://facebook.com" />
          <SocialLink socialSource="email" url="mailto:" />
        </form>
        <button className="modal-button-close js-modal-trigger" onClick={toggleModal}>
          x
        </button>
      </Modal>
      <style jsx>{`
        input[type='radio'] {
          margin-right: 1em !important;
        }
      `}</style>
    </div>
  );
};

SpotlightShare.defaultProps = {
  minHeight: '500px'
};

export { SpotlightShare };
