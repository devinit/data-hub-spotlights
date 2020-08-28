import React, { FunctionComponent, ReactNode, useEffect, useState, useContext } from 'react';
import {
  getBoundariesByDepth,
  hasData,
  LocationData,
  LocationIndicatorData,
  SpotlightIndicator,
  SpotlightLocation,
  toCamelCase,
  useBoundaries,
  CountryContext,
} from '../../utils';
import { Alert } from '../Alert';
import { Icon } from '../Icon';
import { IndicatorComparisonColumnChart } from '../IndicatorComparisonColumnChart';
import { LocationComparisonBarChart } from '../LocationComparisonBarChart';
import { SpotlightHeading } from '../SpotlightHeading';
import { SpotlightInteractive } from '../SpotlightInteractive';
import { SpotlightSidebar } from '../SpotlightSidebar';
import { VisualisationSection, VisualisationSectionMain } from '../VisualisationSection';
import { Loading } from '../Loading';

interface ComponentProps {
  data?: LocationIndicatorData[];
  dataLoading?: boolean;
  location?: SpotlightLocation;
  indicators: [SpotlightIndicator, SpotlightIndicator];
}

const getLocationData = (locations: string[], data: LocationData[]): number[] =>
  locations.map((location) => {
    const match = data.find((_data) => _data.name.toLowerCase() === location.toLowerCase());

    return match && match.value > 0 ? match.value : 0; // FIXME: how do we handle -ve values?
  });

const getHeightFromCount = (count = 12): string => (count >= 12 ? `${((count / 12) * 500).toFixed()}px` : '500px');

const renderPaddedAlert = (message: string): ReactNode => (
  <div>
    <Alert variant="notice">
      <Icon name="warning-warning" />
      <p>{message}</p>
    </Alert>
    <style jsx>{`
      div {
        padding: 12px;
      }
    `}</style>
  </div>
);

const ComparisonChartDataHandler: FunctionComponent<ComponentProps> = ({ data, location, ...props }) => {
  const [locations, setLocations] = useState<string[]>([]);
  const boundaries = useBoundaries();
  const { countryName } = useContext(CountryContext);

  useEffect(() => {
    if (!location) {
      const requiredBoundaries = getBoundariesByDepth(boundaries, 'd');
      setLocations(
        requiredBoundaries
          .map(({ name }) => name)
          .sort()
          .reverse()
      );
    } else {
      setLocations([location.name]); // TODO: get sub-locations here e.g. sub-county/parish
    }
  }, [location, boundaries]);

  if (!data || !hasData(data)) {
    return <>{renderPaddedAlert('Unfortunately, we do not have data for this location.')}</>;
  }

  return (
    <VisualisationSection className="spotlight--leader">
      <SpotlightSidebar>
        <SpotlightHeading>{toCamelCase(location ? location.name : countryName)}</SpotlightHeading>
        <SpotlightInteractive background="#ffffff">
          {location ? (
            <Loading active={!!props.dataLoading}>
              <IndicatorComparisonColumnChart
                height="500px"
                series={{
                  names: [props.indicators[0].name, props.indicators[1].name],
                  data: [getLocationData(locations, data[0].data), getLocationData(locations, data[1].data)],
                }}
                valueOptions={props.indicators.map((indicator) => ({
                  dataFormat: indicator.data_format,
                  prefix: indicator.value_prefix,
                  suffix: indicator.value_suffix,
                }))}
              />
            </Loading>
          ) : (
            renderPaddedAlert('Unfortunately, we do not have data for this location.')
          )}
        </SpotlightInteractive>
      </SpotlightSidebar>

      <VisualisationSectionMain>
        <SpotlightHeading>
          Locations in {location ? toCamelCase(location.name) : toCamelCase(countryName)}
        </SpotlightHeading>
        <SpotlightInteractive maxHeight="500px" background="#ffffff">
          {locations.length > 1 ? (
            <Loading active={!!props.dataLoading}>
              <LocationComparisonBarChart
                labels={locations}
                series={{
                  names: [props.indicators[0].name, props.indicators[1].name],
                  data: [getLocationData(locations, data[0].data), getLocationData(locations, data[1].data)],
                }}
                height={getHeightFromCount(locations.length)}
                valueOptions={props.indicators.map((indicator) => ({
                  dataFormat: indicator.data_format,
                  prefix: indicator.value_prefix,
                  suffix: indicator.value_suffix,
                }))}
              />
            </Loading>
          ) : (
            renderPaddedAlert('Unfortunately, we do not have data for this location.')
          )}
        </SpotlightInteractive>
      </VisualisationSectionMain>
    </VisualisationSection>
  );
};

export { ComparisonChartDataHandler };
