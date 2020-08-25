import React, { FunctionComponent, ReactNode, useEffect } from 'react';
import { groupBy } from 'underscore';
import { LocationData, LocationIndicatorData, SpotlightIndicator, SpotlightLocation, toCamelCase } from '../../utils';
import { Alert } from '../Alert';
import { DataLoaderProps, useDDWData } from '../DDWDataLoader';
import { Loading } from '../Loading';
import { FormattedData, LocationComparisonLineChart } from '../LocationComparisonLineChart';
import { parseIndicator } from '../MapSection/utils';
import { SpotlightInteractive } from '../SpotlightInteractive';

interface ComponentProps {
  data?: LocationIndicatorData; // TODO: remove
  indicator: SpotlightIndicator;
  locations: SpotlightLocation[];
}

const getYears = (data: LocationData[]): number[] =>
  data.reduce((prev: number[], curr) => (prev.indexOf(curr.year) === -1 ? prev.concat(curr.year) : prev), []).sort();

const getDataLoaderOptions = (indicator: SpotlightIndicator, locations: SpotlightLocation[]): DataLoaderProps => ({
  indicators: [parseIndicator(indicator) as string],
  geocodes: locations.map((location) => location.geocode),
  startYear: indicator.start_year,
  endYear: indicator.end_year,
  limit: 10000,
});

const processData = (data: LocationData[]): FormattedData => {
  const groupedByLocation: { [location: string]: LocationData[] } = groupBy(data, (_data) => _data.name);
  const groupedByYear: { [location: string]: { [year: string]: LocationData[] } } = {};
  Object.keys(groupedByLocation).forEach((location) => {
    const groupedByBudgetType = groupBy(groupedByLocation[location], (processedData) => processedData.year);
    groupedByYear[location] = groupedByBudgetType;
  });

  return groupedByYear;
};

const renderMissingDataAlert = (data: LocationData[], locations: SpotlightLocation[]): ReactNode => {
  const noDataLocations = locations
    .filter((location) => !data.find((_data) => _data.geocode === location.geocode))
    .map((location) => toCamelCase(location.name));

  return noDataLocations.length ? (
    <div>
      <Alert variant="notice">For this indicator, we do not have data for {noDataLocations.join(', ')}</Alert>
      <style jsx>{`
        padding: 0 2em 8px;
        background: #ffffff;
      `}</style>
    </div>
  ) : null;
};

const LocationComparisonChartDataHandler: FunctionComponent<ComponentProps> = ({ indicator, locations }) => {
  const valueOptions = {
    dataFormat: indicator.data_format,
    prefix: indicator.value_prefix,
    suffix: indicator.value_suffix,
  };

  if (!locations || locations.length === 0) {
    return (
      <SpotlightInteractive background="#ffffff">
        <LocationComparisonLineChart years={[]} data={{}} height={'500px'} valueOptions={valueOptions} />
      </SpotlightInteractive>
    );
  }

  const { data, dataLoading, setOptions } = useDDWData(getDataLoaderOptions(indicator, locations));
  useEffect(() => {
    setOptions(getDataLoaderOptions(indicator, locations));
  }, [locations, indicator]);

  if (!data) {
    return (
      <SpotlightInteractive background="#ffffff">
        <LocationComparisonLineChart years={[]} data={{}} height={'500px'} valueOptions={valueOptions} />
      </SpotlightInteractive>
    );
  }

  return (
    <>
      {!dataLoading && renderMissingDataAlert(data[0].data, locations)}
      <SpotlightInteractive background="#ffffff">
        <Loading active={dataLoading}>
          <LocationComparisonLineChart
            years={getYears(data[0].data)}
            data={processData(data[0].data)}
            height={'500px'}
            valueOptions={valueOptions}
          />
        </Loading>
      </SpotlightInteractive>
    </>
  );
};

export { LocationComparisonChartDataHandler };
