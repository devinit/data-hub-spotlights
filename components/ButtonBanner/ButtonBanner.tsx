import React, { FunctionComponent } from 'react';
import { AnchorButton } from '../AnchorButton';
import { SpotlightBanner, SpotlightBannerAside } from '../SpotlightBanner';

interface ButtonBannerProps {
  onClick?: () => void;
  className?: string;
}

const ButtonBanner: FunctionComponent<ButtonBannerProps> = ({ onClick, children, className }) => (
  <SpotlightBanner>
    <SpotlightBannerAside>
      <AnchorButton className={className} onClick={onClick}>
        {children}
      </AnchorButton>
    </SpotlightBannerAside>
  </SpotlightBanner>
);

export { ButtonBanner };
