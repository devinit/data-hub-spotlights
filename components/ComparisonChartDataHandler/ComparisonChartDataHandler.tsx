import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import {
  getBoundariesByCountryCode,
  getBoundariesByDepth,
  hasData,
  LocationData,
  LocationIndicatorData,
  SpotlightIndicator,
  SpotlightLocation,
  toCamelCase
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
  countryCode: string;
  countryName: string;
  indicators: [SpotlightIndicator, SpotlightIndicator];
}

const getLocationData = (locations: string[], data: LocationData[]): number[] =>
  locations.map(location => {
    const match = data.find(_data => _data.name.toLowerCase() === location.toLowerCase());

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

  useEffect(() => {
    if (!location) {
      getBoundariesByCountryCode(props.countryCode).then(boundaries => {
        const requiredBoundaries = getBoundariesByDepth(boundaries, 'd');
        setLocations(
          requiredBoundaries
            .map(({ name }) => name)
            .sort()
            .reverse()
        );
      });
    } else {
      setLocations([location.name]); // TODO: get sub-locations here e.g. sub-county/parish
    }
  }, [location]);

  if (!data || !hasData(data)) {
    return <>{renderPaddedAlert('Unfortunately, we do not have data for this location.')}</>;
  }

  return (
    <VisualisationSection className="spotlight--leader">
      <SpotlightSidebar>
        <SpotlightHeading>{toCamelCase(location ? location.name : props.countryName)}</SpotlightHeading>
        <SpotlightInteractive background="#ffffff">
          {location ? (
            <Loading active={!!props.dataLoading}>
              <IndicatorComparisonColumnChart
                height="500px"
                series={{
                  names: [props.indicators[0].name, props.indicators[1].name],
                  data: [getLocationData(locations, data[0].data), getLocationData(locations, data[1].data)]
                }}
              />
            </Loading>
          ) : (
            renderPaddedAlert('Unfortunately, we do not have data for this location.')
          )}
        </SpotlightInteractive>
      </SpotlightSidebar>

      <VisualisationSectionMain>
        <SpotlightHeading>
          Locations in {location ? toCamelCase(location.name) : toCamelCase(props.countryName)}
        </SpotlightHeading>
        <SpotlightInteractive maxHeight="500px" background="#ffffff">
          {locations.length > 1 ? (
            <Loading active={!!props.dataLoading}>
              <LocationComparisonBarChart
                labels={locations}
                series={{
                  names: [props.indicators[0].name, props.indicators[1].name],
                  data: [getLocationData(locations, data[0].data), getLocationData(locations, data[1].data)]
                }}
                height={getHeightFromCount(locations.length)}
                valueOptions={[
                  {
                    dataFormat: props.indicators[0].data_format,
                    prefix: props.indicators[0].value_prefix,
                    suffix: props.indicators[0].value_suffix
                  },
                  {
                    dataFormat: props.indicators[1].data_format,
                    prefix: props.indicators[1].value_prefix,
                    suffix: props.indicators[1].value_suffix
                  }
                ]}
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
