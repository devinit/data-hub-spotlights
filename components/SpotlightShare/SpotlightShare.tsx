import React, { FunctionComponent } from 'react';
import { Button } from '../Button';
import classNames from 'classnames';
import Modali, { useModali } from 'modali';

interface SpotlightShareProps {
  maxHeight?: string;
  minHeight?: string;
  className?: string;
}

const SpotlightShare: FunctionComponent<SpotlightShareProps> = props => {
  const [show, setShow] = useModali({
    animated: false,
    title: 'Share this visualisation',
    buttons: <Modali.Button label="Cancel" isStyleCancel onClick={() => setShow()} />
  });

  return (
    <div className={classNames(props.className)}>
      <Button onClick={setShow}>Share this visualisation</Button>
      <Modali.Modal {...show}>
        <input type="radio" value="1" />
        in default view
        <br />
        <input type="radio" value="2" />
        as I configured it
        <br />
        <input type="text" />
      </Modali.Modal>
    </div>
  );
};

SpotlightShare.defaultProps = {
  minHeight: '500px'
};

export { SpotlightShare };
