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
      {label}
      <button type="button" onClick={onRemove}>
        <i role="presentation" aria-hidden="true" className="ico ico--20 ico-cross-slate"></i>
      </button>
    </li>
  );
};

export { TagsListItem };
