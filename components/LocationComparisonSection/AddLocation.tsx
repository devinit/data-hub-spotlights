import React, { FunctionComponent, useEffect, useState } from 'react';

interface AddLocationProps {
  label: string;
  active?: boolean;
  toggleComponentVisibility?: (MenuState: boolean, AddLocationState: boolean) => void;
}

const AddLocation: FunctionComponent<AddLocationProps> = ({ label, active, toggleComponentVisibility }) => {
  const [show, setShow] = useState(active);
  const toggle = (): void => {
    setShow(false);
    toggleComponentVisibility ? toggleComponentVisibility(true, false) : null;
  };

  useEffect(() => {
    setShow(active);
  }, [active]);

  return (
    <a className="m-text-link" onClick={toggle}>
      <style jsx>{`
        .m-text-link {
          display: ${show ? 'block' : 'none'};
          cursor: 'pointer';
        }
      `}</style>
      <i role="presentation" aria-hidden="true" className="ico ico--16 ico-plus-poppy"></i>
      <span>{label}</span>
    </a>
  );
};

export { AddLocation };
