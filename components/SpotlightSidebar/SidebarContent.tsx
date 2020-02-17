import React, { FunctionComponent } from 'react';

interface SidebarContentProps {
  height?: string;
}

const SidebarContent: FunctionComponent<SidebarContentProps> = ({ children, height }) => {
  return (
    <div className="spotlight__content" style={{ height }}>
      {children}
      <style jsx>{`
        height: 100%;
      `}</style>
    </div>
  );
};

export { SidebarContent };
