import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

interface BannerAsideProps {
  classname: string;
  text: string;
}

const SubmitButton: FunctionComponent<BannerAsideProps> = ({ text, classname }) => {
  return (
    <button type="submit" className={classNames('button', classname)}>
      {text}
    </button>
  );
};
export { SubmitButton };
