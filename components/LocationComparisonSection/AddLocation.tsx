import React, { FunctionComponent, useState } from 'react';

interface AddLocationProps {
  label: string;
  active?: boolean;
}

const AddLocation: FunctionComponent<AddLocationProps> = ({ label, active = true }) => {
  const [show, setShow] = useState(active);
  const toggle = (): void => {
    setShow(false);
  };

  return (
    <a href="#" className="m-text-link" onClick={toggle}>
      <style jsx>{`
        .m-text-link {
          display: ${show ? 'block' : 'none'};
        }
      `}</style>
      <i role="presentation" aria-hidden="true" className="ico ico--16 ico-plus-poppy"></i>
      <span>{label}</span>
    </a>
  );
};

export { AddLocation };
