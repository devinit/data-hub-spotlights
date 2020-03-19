import React, { FunctionComponent } from 'react';
import { Button } from '../Button';

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
      <Button type="button" onClick={onRemove}>
        <i role="presentation" aria-hidden="true" className="ico ico--20 ico-cross-slate"></i>
      </Button>
    </li>
  );
};

export { TagsListItem };
