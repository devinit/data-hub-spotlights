import React from 'react';

const SocialLink = (props: any) => {
  return (
    <a href={props.url}>
      <img src={'/assets/svg/source/' + props.socialSource + '.svg'} alt={props.socialSource} />
      <style jsx>{`
        img {
          float: left;
          margin: 0 5px;
          height: 3em;
          width: 3em;
        }
      `}</style>
    </a>
  );
};

export { SocialLink };
