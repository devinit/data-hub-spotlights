import React from 'react';

const getPath = (name: string, props: JSX.IntrinsicAttributes & React.SVGProps<SVGPathElement>) => {
  switch (name) {
    case 'twitter':
      return (
        <path
          {...props}
          d="M69.39,123.6c34.57,0,53.47-28.64,53.47-53.47,0-.82,0-1.63-.06-2.43A38.22,38.22,0,0,0,132.18,58a38,38,0,0,1-10.79,3,18.89,18.89,0,0,0,8.26-10.4,37.79,37.79,0,0,1-11.93,4.57A18.8,18.8,0,0,0,85.21,67.94a19.68,19.68,0,0,0,.48,4.3A53.4,53.4,0,0,1,47,52.6a18.78,18.78,0,0,0,5.82,25.08,18.61,18.61,0,0,1-8.52-2.35v.24A18.79,18.79,0,0,0,59.33,94a18.35,18.35,0,0,1-8.48.32A18.81,18.81,0,0,0,68.4,107.37a37.7,37.7,0,0,1-23.34,8,37,37,0,0,1-4.48-.27,53.13,53.13,0,0,0,28.81,8.45"
        />
      );
    case 'facebook':
      return (
        <path
          {...props}
          d="M100.28,56.62h9.47V41.75H95.56s-8.91-.22-14.6,7.17c0,0-3.87,3.65-3.93,14.33h0V74.41H63v15.8H77V131H93.2V90.21h13.91L109,74.41H93.2V63.25h0C93.23,62,93.79,56.51,100.28,56.62Z"
        />
      );
    default:
      return <path />;
  }
};
const getViewBox = (name: any) => {
  switch (name) {
    case 'twitter':
      return '0 0 172.76 172.76'; // Eg. 0 0 32 32
    case 'facebook':
      return '0 0 172.76 172.76';
    default:
      return '';
  }
};
const SVG = ({ name = '', style = {}, fill = '#000', width = '100%', className = '', height = '100%' }) => (
  <svg
    width={width}
    style={style}
    height={height}
    viewBox={getViewBox(name)}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    {getPath(name, { fill })}
  </svg>
);
export { SVG };
