import React, { FunctionComponent, ReactNode } from 'react';

interface SpotlightPopupContentProps {
  description?: string;
  source?: string;
  close: () => void;
}

const SpotlightPopupContent: FunctionComponent<SpotlightPopupContentProps> = ({ close, description, source }) => {
  const renderSourceText = (): ReactNode => {
    if (source) {
      return (
        <>
          <b>
            Source:{' '}
            <style jsx>{`
              font-family: Geomanist Bold, sans-serif;
            `}</style>
          </b>
          {source}
        </>
      );
    }
  };

  return (
    <div className="spotlight-modal">
      <a className="close" onClick={close}>
        &times;
      </a>
      <div className="content">
        <p className="description">{description}</p>
        <br />
        <p className="source">{renderSourceText()}</p>
      </div>
      <style jsx>{`
        font-size: 12px;

        .spotlight-modal > .close {
          cursor: pointer;
          position: absolute;
          display: block;
          padding: 5px 5px;
          line-height: 20px;
          right: 0px;
          top: 0px;
          font-size: 20px;
          background: transparent;
          color: #333131;
          font-weight: 900;
        }
        .spotlight-modal > .content {
          width: 100%;
          padding: 20px 5px 5px 5px;
        }
        .content > .description {
          font-size: 14px;
        }
        .spotlight-modal > source {
          text-align: left;
        }
      `}</style>
    </div>
  );
};
export { SpotlightPopupContent };
