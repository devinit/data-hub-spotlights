import React, { FunctionComponent, ReactNode } from 'react';
import { TagsList } from './TagsList';
import { TagsListItem } from './TagsListItem';
import { SpotlightLocation } from '../../utils';

interface TagsProps {
  updatedTags: SpotlightLocation[];
  onCloseTag: (tagName: string) => void;
}

const Tags: FunctionComponent<TagsProps> = ({ onCloseTag, updatedTags }) => {
  const onRemove = (label: string): void => {
    onCloseTag(label);
  };

  const renderLocationTagItems = (): ReactNode => {
    return updatedTags.map((tag: any, index: number) => {
      return <TagsListItem key={index} label={tag.name} onRemoveTag={onRemove} />;
    });
  };

  return (
    <>
      <TagsList>{renderLocationTagItems()}</TagsList>
    </>
  );
};

Tags.defaultProps = {
  updatedTags: []
};

export { Tags };
