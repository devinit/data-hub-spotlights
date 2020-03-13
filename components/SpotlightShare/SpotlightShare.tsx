import React, { FunctionComponent, useState } from 'react';
import Modal from 'react-modal';
import { Button } from '../Button';
//import { SVG } from './icons';

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
    width: '600px',
    maxWidth: '100%',
    height: '300px',
    maxHeight: '100%',
    padding: '20px 50px 20px 20px',
    overflow: 'auto',
    borderRadius: 10
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
      <Modal isOpen={isOpen} onAfterOpen={disableScroll} onRequestClose={toggleModal} style={customStyles}>
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
          <a href="#">
            <img
              src="/assets/svg/source/twitter.svg"
              alt="twitter"
              style={{
                margin: '0 7px',
                height: '3em',
                width: '3em'
              }}
            />
          </a>
          <a href="#">
            <img
              src="/assets/svg/source/facebook.svg"
              alt="facebook"
              style={{
                height: '3em',
                width: '3em'
              }}
            />
          </a>
        </form>
      </Modal>
    </div>
  );
};

SpotlightShare.defaultProps = {
  minHeight: '500px'
};

export { SpotlightShare };
