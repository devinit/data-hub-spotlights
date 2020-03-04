import React, { FunctionComponent, ReactNode } from 'react';
import { TagsList } from './TagsList';
import { TagsListItem } from './TagsListItem';
import { LocationTagType } from '../LocationComparisonSection';

interface TagsProps {
  updatedTags: LocationTagType;
  onCloseTag: (tagName: string) => void;
}

const Tags: FunctionComponent<TagsProps> = ({ onCloseTag, updatedTags }) => {
  const onRemove = (label: string): void => {
    onCloseTag(label);
  };

  const renderLocationTagItems = (): ReactNode => {
    return updatedTags.map((tag: any, index: number) => {
      return <TagsListItem key={index} label={tag.label} onRemoveTag={onRemove} />;
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
