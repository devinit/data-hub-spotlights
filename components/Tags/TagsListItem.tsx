import React, { FunctionComponent } from 'react';

interface TagsListItemProps {
  label: string;
  onRemoveTag?: (label: string) => void;
}

const TagsListItem: FunctionComponent<TagsListItemProps> = ({ label, onRemoveTag }) => {
  const onRemove = (): void => {
    onRemoveTag ? onRemoveTag(label) : null;
  };

  return (
    <li className="m-pills__item">
      <style jsx>{`
        .m-pills__item {
          margin-bottom: 5px !important;
        }
      `}</style>
      <button type="button" onClick={onRemove}>
        <i role="presentation" aria-hidden="true" className="ico ico--16 ico-plus-blank"></i>
      </button>
      {label}
    </li>
  );
};

export { TagsListItem };
