import React, { FunctionComponent } from 'react';

interface AddLocationProps {
  label: string;
}

const AddLocation: FunctionComponent<AddLocationProps> = ({ label }) => {
  return (
    <a href="#" className="m-text-link">
      <i role="presentation" aria-hidden="true" className="ico ico--16 ico-plus-poppy"></i>
      <span>{label}</span>
    </a>
  );
};

export { AddLocation };
