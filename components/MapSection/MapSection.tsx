import dynamic from 'next/dynamic';
import React, { FunctionComponent, ReactNode, useState } from 'react';
import { SpotlightLocation, SpotlightOptions } from '../../utils';
import { Legend, LegendItem } from '../Legend';
import { MapSectionHeader } from '../MapSectionHeader';
import { PageSection } from '../PageSection';
import { SpotlightFilters } from '../SpotlightFilters';
import { SpotlightIndicatorInfo } from '../SpotlightIndicatorInfo';
import { SpotlightInteractive } from '../SpotlightInteractive';
import { SpotlightShare } from '../SpotlightShare';
import { SidebarContent, SpotlightSidebar } from '../SpotlightSidebar';
import { VisualisationSection, VisualisationSectionMain } from '../VisualisationSection';
import {
  getDataPrefix,
  getDataSuffix,
  getIndicatorColours,
  MapSectionProps,
  parseIndicator,
  splitByComma
} from './utils';

const DynamicMap = dynamic(() => import('../SpotlightMap').then(mod => mod.SpotlightMap), { ssr: false });
const DynamicMapDataLoader = dynamic(() => import('../DDWDataLoader').then(mod => mod.DDWDataLoader), { ssr: false });

const renderLegendItems = (range?: string[], colours?: string[]): ReactNode => {
  if (range && colours) {
    return range
      .map((rnge, index) => (
        <LegendItem bgColor={colours[index]} key={index}>
          {index === 0 ? `< ${range[0]}` : `${range[index - 1]}-${rnge}`}
        </LegendItem>
      ))
      .concat([
        <LegendItem bgColor={colours[colours.length - 1]} key={range.length}>
          {`> ${range[range.length - 1]}`}
        </LegendItem>
      ]);
  }

  return null;
};

const MapSection: FunctionComponent<MapSectionProps> = ({ countryCode, onChangeLocation, ...props }) => {
  const [options, setOptions] = useState<SpotlightOptions>({});
  const onOptionsChange = (optns: SpotlightOptions): void => setOptions(optns);
  const [activeLocation, setActiveLocation] = useState<SpotlightLocation | undefined>(undefined);
  const onSelectLocation = (location?: SpotlightLocation): void => {
    setActiveLocation(location);
    if (onChangeLocation) {
      onChangeLocation(location);
    }
  };

  const range = options.indicator && splitByComma(options.indicator.range);
  const colours = getIndicatorColours(options.indicator, range);
  const indicatorID = options.indicator && parseIndicator(options.indicator);

  return (
    <PageSection>
      <MapSectionHeader onSelectLocation={onSelectLocation} countryCode={countryCode} countryName={props.countryName} />

      <VisualisationSection>
        <SpotlightSidebar className="spotlight__aside--no-margin">
          <SidebarContent>
            <SpotlightFilters
              themes={props.themes}
              onOptionsChange={onOptionsChange}
              topicClassName=""
              indicatorClassName="form-field--spaced-minor"
              yearClassName="form-field--inline"
            />
            <SpotlightIndicatorInfo
              heading={options.indicator && options.indicator.name}
              description={options.indicator && options.indicator.description}
            />
            <Legend>
              {renderLegendItems(range, colours)}
              <LegendItem>no data / not applicable</LegendItem>
            </Legend>
            <SpotlightShare />
          </SidebarContent>
        </SpotlightSidebar>

        <VisualisationSectionMain>
          <SpotlightInteractive height="100%">
            <DynamicMapDataLoader
              indicators={indicatorID ? [indicatorID] : undefined}
              geocodes={activeLocation && [activeLocation.geocode]}
              year={options.year ? options.year : options.indicator && options.indicator.start_year}
              limit={10000}
            >
              <DynamicMap
                countryCode={countryCode}
                range={range}
                colours={colours}
                dataPrefix={getDataPrefix(options)}
                dataSuffix={getDataSuffix(options)}
                location={activeLocation}
                locationHandling="flyto"
              />
            </DynamicMapDataLoader>
          </SpotlightInteractive>
        </VisualisationSectionMain>
      </VisualisationSection>
    </PageSection>
  );
};

export { MapSection };
