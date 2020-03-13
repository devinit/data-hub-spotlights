import React, { FunctionComponent } from 'react';
import Modal from 'react-modal';
import { Button } from '../Button';
import classNames from 'classnames';
import { SVG } from './icons';
import './styles.css';

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
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className={classNames(props.className)}>
      <Button onClick={openModal}>Share this visualisation</Button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
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
          <input type="text" id="urllink" name="urllink" />
          <br />
          <br />
          <button type="submit">
            <SVG fill="#49c" width={'100'} name="twitter" />
          </button>
          <button type="submit">
            <SVG fill="#49c" width={'100'} name="facebook" />
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
