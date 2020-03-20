import React, { FunctionComponent, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
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

const Title = styled.h2`
  font-size: 2.6rem;
`;
const ToggleButton = styled.button`
  cursor: pointer;
  background: #000;
  font-size: 26px;
  border-bottom-left-radius: 8px;
  color: #fff;
  position: absolute;
  right: 0;
  top: 0;
  padding: 0px 15px;
  display: block;
`;
const TextInput = styled.input`
  padding: 2em 1.5em;
  height: 5em;
`;

const RadioInput = styled.input`
  margin-right: 1em !important;
`;
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
          <Title>Share this visualisation</Title>
          <br />
          <label htmlFor="one">
            <RadioInput type="radio" id="one" name="first_item" value="1" />
            In default view
          </label>
          <label htmlFor="two">
            <RadioInput type="radio" id="two" name="second_item" value="2" />
            As I configured it
          </label>
          <br />
          <TextInput type="text" id="urllink" name="urllink" />
          <br />
          <br />
          <SVG socialSource="twitter" />
          <SVG socialSource="facebook" />
          <SVG socialSource="email" />
        </form>
        <ToggleButton onClick={toggleModal}>x</ToggleButton>
      </Modal>
    </div>
  );
};

SpotlightShare.defaultProps = {
  minHeight: '500px'
};

export { SpotlightShare };
