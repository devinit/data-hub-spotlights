import React from 'react';

const SVG = (props: any) => (
  <div>
    <a href="#">
      <img
        src={'/assets/svg/source/' + props.socialSource + '.svg'}
        alt={props.socialSource}
        style={{
          float: 'left',
          margin: '0 5px',
          height: '3em',
          width: '3em'
        }}
      />
    </a>
  </div>
);

export { SVG };
