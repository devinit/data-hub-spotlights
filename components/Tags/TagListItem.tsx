import React, { FunctionComponent } from 'react';
import { Button } from '../Button';

interface TagsListItemProps {
  label: string;
  onRemove?: (label: string) => void;
}

const TagListItem: FunctionComponent<TagsListItemProps> = ({ label, onRemove: onRemoveTag }) => {
  const onRemove = (): void => {
    if (onRemoveTag) {
      onRemoveTag(label);
    }
  };

  return (
    <li className="m-pills__item">
      {label.toLowerCase()}
      <Button onClick={onRemove} className="">
        <i role="presentation" aria-hidden="true" className="ico ico--20 ico-cross-slate"></i>
      </Button>
      <style jsx>{`
        text-transform: capitalize;
      `}</style>
    </li>
  );
};

export { TagListItem };
