import dynamic from 'next/dynamic';
import React, { Children, cloneElement, FunctionComponent, isValidElement, useEffect, useState } from 'react';
import { LocationIndicatorData, SpotlightLocation, SpotlightOptions } from '../../utils';
import { Loading } from '../Loading';
import { parseIndicator } from '../MapSection/utils';

interface ComponentProps {
  options?: [SpotlightOptions];
  locations?: SpotlightLocation[];
  loading?: boolean;
  onLoad?: () => void;
}
type LocData = LocationIndicatorData;

const DynamicDataLoader = dynamic(() => import('../DDWDataLoader').then(mod => mod.DDWDataLoader), { ssr: false });

const LocationComparisonDataLoader: FunctionComponent<ComponentProps> = props => {
  const [loading, setLoading] = useState(props.loading);
  const [data, setData] = useState<LocData | undefined>(undefined);
  useEffect(() => setLoading(props.loading), [props.loading]);
  useEffect(() => {
    if (data) {
      setLoading(false);
      if (props.onLoad) {
        props.onLoad();
      }
    }
  }, [data]);

  const onLoad = (data: LocData[]): void => {
    if (props.onLoad) {
      props.onLoad();
    }
    setData(data[0]);
  };

  if (!props.options) {
    return <div>No Data</div>;
  }

  if (loading) {
    return (
      <Loading active>
        {props.options.map(({ indicator }, index) => (
          <div key={index}>
            <DynamicDataLoader
              indicators={indicator ? [parseIndicator(indicator) as string] : []}
              startYear={indicator && indicator.start_year}
              endYear={indicator && indicator.end_year}
              onLoad={onLoad}
              geocodes={props.locations && props.locations.map(location => location.geocode)}
              limit={10000}
            />
          </div>
        ))}
      </Loading>
    );
  }

  if (data) {
    return (
      <>
        {Children.map(props.children, child => (isValidElement(child) ? cloneElement(child, { data: [data] }) : null))}
      </>
    );
  }

  return <div>No Data</div>;
};

export { LocationComparisonDataLoader };
