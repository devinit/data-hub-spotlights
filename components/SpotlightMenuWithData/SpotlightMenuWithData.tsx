import React, { FunctionComponent, useEffect, useState } from 'react';
import { getBoundariesByCountryCode, SpotlightBoundary } from '../../utils';
import { BoundaryMenu } from '../BoundaryMenu';
import { SelectOption } from '../Select';
import { MenuListItem } from '../SpotlightMenu';

interface SpotlightMenuWithDataProps {
  countryName: string;
  countryCode: string;
  spotlightMenu?: boolean;
  onWidgetClick: (widgetState: boolean, location: any) => void;
}

const SpotlightMenuWithData: FunctionComponent<SpotlightMenuWithDataProps> = ({
  countryName,
  countryCode,
  spotlightMenu,
  onWidgetClick
}) => {
  const [boundaries, setBoundaries] = useState<SpotlightBoundary[]>([]);
  useEffect(() => {
    getBoundariesByCountryCode(countryCode).then(boundaryData => {
      setBoundaries(boundaryData);
    });
  }, [countryCode]);

  const onSelectLocation = (option?: SelectOption | MenuListItem | null): void => {
    onWidgetClick(false, option && option.value ? { geocode: option.value, name: option.label } : undefined);
  };

  return spotlightMenu === true ? (
    <BoundaryMenu countryName={countryName} boundaries={boundaries} onSelectLocation={onSelectLocation} />
  ) : (
    <span />
  );
};

export { SpotlightMenuWithData };
