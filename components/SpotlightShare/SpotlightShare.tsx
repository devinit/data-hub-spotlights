import React, { FunctionComponent, useState } from 'react';
import Modal from 'react-modal';
import { Button } from '../Button';
import { SVG } from './icons';

interface SpotlightShareProps {
  maxHeight?: string;
  minHeight?: string;
  className?: string;
}
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    width: '50%',
    height: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const SpotlightShare: FunctionComponent<SpotlightShareProps> = props => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleClick = () => {
    console.log('hello');
  };
  return (
    <div className={props.className}>
      <Button onClick={toggleModal}>Share this visualisation</Button>
      <Modal isOpen={isOpen} toggle={toggleModal} style={customStyles}>
        <form>
          <label>
            <b> Share this visualisation</b>
          </label>
          <br />
          <label htmlFor="one">
            <input type="radio" id="one" name="first_item" value="1" />
            in default view
          </label>
          <label htmlFor="two">
            <input type="radio" id="two" name="second_item" value="2" />
            as I configured it
          </label>
          <br />
          <input
            type="text"
            id="urllink"
            name="urllink"
            style={{
              padding: '0.5em 1.5em',
              borderWidth: '2px',
              height: '3em',
              borderColor: 'rgb(42, 39, 41)',
              borderStyle: 'solid',
              outline: '0px'
            }}
          />
          <br />
          <br />
          <button type="submit" onClick={handleClick}>
            <SVG fill="#49c" width={'40'} name="twitter" />
          </button>
          <button type="submit" onClick={handleClick}>
            <SVG fill="#49c" width={'40'} name="facebook" />
          </button>
          <button type="submit"></button>
        </form>
      </Modal>
    </div>
  );
};

SpotlightShare.defaultProps = {
  minHeight: '500px'
};

export { SpotlightShare };
