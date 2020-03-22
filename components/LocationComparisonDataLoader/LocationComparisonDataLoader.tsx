import dynamic from 'next/dynamic';
import React, { Children, cloneElement, FunctionComponent, isValidElement, useEffect, useState } from 'react';
import { LocationIndicatorData, SpotlightIndicator, SpotlightLocation, SpotlightOptions } from '../../utils';
import { Loading } from '../Loading';
import { parseIndicator } from '../MapSection/utils';

interface ComponentProps {
  options?: [SpotlightOptions];
  locations?: SpotlightLocation[];
  loading?: boolean;
  onLoad?: () => void;
}

const DynamicDataLoader = dynamic(() => import('../DDWDataLoader').then(mod => mod.DDWDataLoader), { ssr: false });
type LocData = LocationIndicatorData;

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

  const onLoad = () => (data: LocData[]): void => {
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
        {props.options.map(({ indicator, year }, index) => {
          const _indicators = [parseIndicator(indicator as SpotlightIndicator) as string];
          return (
            <div key={index}>
              <DynamicDataLoader
                indicators={_indicators}
                startYear={year}
                endYear={2020}
                onLoad={onLoad()}
                geocodes={props.locations && props.locations.map(loc => loc.geocode)}
                limit={10000}
              />
            </div>
          );
        })}
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
