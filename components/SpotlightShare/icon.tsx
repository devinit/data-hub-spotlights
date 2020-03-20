import React from 'react';
import styled from 'styled-components';

const Icon = styled.img`
  float: left;
  margin: 0 5px;
  height: 3em;
  width: 3em;
`;

const SVG = (props: any) => (
  <div>
    <a href="#">
      <Icon src={'/assets/svg/source/' + props.socialSource + '.svg'} alt={props.socialSource} />
    </a>
  </div>
);

export { SVG };
