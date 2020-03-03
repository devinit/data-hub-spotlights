import React, { FunctionComponent } from 'react';

interface LocationTagsListItemProps {
  label: string;
  active?: boolean;
  removeTag: (label: string) => void;
}

const LocationTagsListItem: FunctionComponent<LocationTagsListItemProps> = ({ label, removeTag }) => {
  const remove = (): void => {
    removeTag(label);
  };

  return (
    <li className="m-pills__item">
      <style jsx>{`
        .m-pills__item {
          margin-bottom: 5px !important;
        }
      `}</style>
      <button type="button" onClick={remove}>
        <i role="presentation" aria-hidden="true" className="ico ico--16 ico-plus-blank"></i>
      </button>
      {label}
    </li>
  );
};

export { LocationTagsListItem };
