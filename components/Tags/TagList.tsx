import React, { FunctionComponent, Children, isValidElement } from 'react';
import { TagListItem } from './TagListItem';

export const TagList: FunctionComponent = ({ children }) => (
  <ul className="m-pills">
    {Children.map(children, (child) => (isValidElement(child) && child.type === TagListItem ? child : null))}
  </ul>
);
