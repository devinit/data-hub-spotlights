import React, { FunctionComponent } from 'react';
import Modal from 'react-modal';
import { Button } from '../Button';
import classNames from 'classnames';

interface SpotlightShareProps {
  maxHeight?: string;
  minHeight?: string;
  className?: string;
}

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
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}></Modal>
    </div>
  );
};

SpotlightShare.defaultProps = {
  minHeight: '500px'
};

export { SpotlightShare };
