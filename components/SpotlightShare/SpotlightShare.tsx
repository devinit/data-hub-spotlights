import React, { FunctionComponent, useState } from 'react';
import Modal from 'react-modal';
import { Button } from '../Button';
import { SVG } from './icon';

interface SpotlightShareProps {
  maxHeight?: string;
  minHeight?: string;
  className?: string;
}
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '680px',
    height: '280px',
    maxHeight: '100%',
    padding: '20px',
    overflow: 'auto',
    borderRadius: '8px',
    backgroundColor: '#fefefe',
    boxShadow: '20px 40px 50px rgba(0, 0, 0, 0.1)'
  },
  overlay: {
    background: 'rgba(0,0,0,.85)',
    zIndex: 1000
  }
};

const SpotlightShare: FunctionComponent<SpotlightShareProps> = props => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const disableScroll = () => {
    document.body.style.overflow = 'hidden';
  };
  return (
    <div className={props.className}>
      <Button onClick={toggleModal}>Share visualisation</Button>
      <Modal
        isOpen={isOpen}
        onAfterOpen={disableScroll}
        onRequestClose={toggleModal}
        style={customStyles}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
      >
        <form>
          <h2 style={{ fontSize: '2.6rem' }}>Share this visualisation</h2>
          <br />
          <label htmlFor="one">
            <input type="radio" id="one" name="first_item" value="1" style={{ marginRight: '1em' }} />
            In default view
          </label>
          <label htmlFor="two">
            <input type="radio" id="two" name="second_item" value="2" style={{ marginRight: '1em' }} />
            As I configured it
          </label>
          <br />
          <input
            type="text"
            id="urllink"
            name="urllink"
            style={{
              padding: '2em 1.5em',
              height: '5em'
            }}
          />
          <br />
          <br />
          <SVG socialSource="twitter" />
          <SVG socialSource="facebook" />
          <SVG socialSource="email" />
        </form>
        <button
          onClick={toggleModal}
          style={{
            padding: '0px 15px',
            color: '#fff',
            fontSize: '26px',
            position: 'absolute',
            right: 0,
            top: 0,
            cursor: 'pointer',
            backgroundColor: '#000',
            borderBottomLeftRadius: '8px',
            display: 'block'
          }}
        >
          x
        </button>
      </Modal>
    </div>
  );
};

SpotlightShare.defaultProps = {
  minHeight: '500px'
};

export { SpotlightShare };
