import React, { Children, FunctionComponent, isValidElement } from 'react';
import { TabContent } from './TabContent';

interface TabContainerProps {
  id: string;
  label: string;
  active?: boolean;
}

const TabContainer: FunctionComponent<TabContainerProps> = ({ id, active, label, children }) => {
  const renderContent = () => {
    return Children.map(children, child => (isValidElement(child) && child.type === TabContent ? child : null));
  };

  return (
    <section className="tabs__container" id={id}>
      <input className="tabs__input" type="radio" name="sections" id={`${id}-option`} defaultChecked={active} />
      <label className="tabs__label" htmlFor={`${id}-option`}>
        {label}
      </label>
      {renderContent()}
    </section>
  );
};

export { TabContainer };
