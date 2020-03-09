import React, { FunctionComponent } from 'react';

interface AddLocationProps {
  label: string;
  active?: boolean;
  onWidgetClick?: (widgetState: boolean, tagName: string) => void;
}

const AddLocation: FunctionComponent<AddLocationProps> = ({ label, active, onWidgetClick }) => {
  const toggle = (): void => {
    onWidgetClick ? onWidgetClick(true, '') : null;
  };

  return (
    <a className="m-text-link add-location-link" onClick={toggle}>
      <style jsx>{`
        .add-location-link {
          display: ${active ? 'block' : 'none'};
          cursor: pointer;
        }
      `}</style>
      <i role="presentation" aria-hidden="true" className="ico ico--16 ico-plus-poppy"></i>
      <span>{label}</span>
    </a>
  );
};

export { AddLocation };
