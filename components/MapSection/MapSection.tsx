import dynamic from 'next/dynamic';
import React, { FunctionComponent, useState } from 'react';
import { SpotlightLocation } from '../../utils';
import { Legend, LegendItem } from '../Legend';
import { MapSectionBody, MapSectionBodyMain } from '../MapSectionBody';
import { MapSectionHeader } from '../MapSectionHeader';
import { PageSection } from '../PageSection';
import { SpotlightFilters } from '../SpotlightFilters';
import { SpotlightIndicatorInfo } from '../SpotlightIndicatorInfo';
import { MapLocations } from '../SpotlightMap';
import { SidebarContent, SpotlightSidebar } from '../SpotlightSidebar';
import { MapSectionProps, SpotlightOptions, getIndicatorColours, parseIndicator, splitByComma } from './utils';

const DynamicMap = dynamic(
  () => import('../SpotlightMap').then(mod => mod.SpotlightMap),
  { ssr: false });
const DynamicMapDataLoader = dynamic(
  () => import('../MapDataLoader').then(mod => mod.MapDataLoader),
  { ssr: false });

const renderLegendItems = (range?: string[], colours?: string[]) => {
  if (range && colours) {
    return range.map((rnge, index) =>
      <LegendItem bgColor={ colours[index] } key={ 0 }>
        { index === 0 ? `< ${range[0]}` : `${range[index - 1]}-${rnge}` }
      </LegendItem>
    ).concat([
      <LegendItem bgColor={ colours[colours.length - 1] } key={ 0 }>
        { `> ${range[range.length - 1]}` }
      </LegendItem>
    ]);
  }

  return null;
};

const MapSection: FunctionComponent<MapSectionProps> = ({ countryCode, themes: themeData }) => {
  const [ options, setOptions ] = useState<SpotlightOptions>({});
  const onOptionsChange = (optns: SpotlightOptions) => setOptions(optns);
  const [ locations, setLocations ] = useState<MapLocations | undefined>(undefined);
  const [ activeLocation, setActiveLocation ] = useState<SpotlightLocation | undefined>(undefined);
  const onSelectLocation = (location: SpotlightLocation) => setActiveLocation(location);

  const onMapLoad = (formattedData: MapLocations) => {
    setLocations(formattedData);
  };
  const range = options.indicator && splitByComma(options.indicator.range);
  const colours = getIndicatorColours(options.indicator, range);

  return (
    <PageSection>
      <MapSectionHeader onSelectLocation={ onSelectLocation } locations={ locations }/>

      <MapSectionBody>
        <SpotlightSidebar>
          <SidebarContent>
            <SpotlightFilters themes={ themeData } onOptionsChange={ onOptionsChange }/>
            <SpotlightIndicatorInfo
              heading={ options.indicator && options.indicator.name }
              description={ options.indicator && options.indicator.description }
            />
            <Legend>
              { renderLegendItems(range, colours) }
              <LegendItem>no data / not applicable</LegendItem>
            </Legend>
          </SidebarContent>
        </SpotlightSidebar>

        <MapSectionBodyMain>
          <DynamicMapDataLoader
            indicator={ options.indicator && parseIndicator(options.indicator) }
            geocode={ activeLocation && activeLocation.geocode }
            year={ options.year ? options.year : options.indicator && options.indicator.start_year }
          >
            <DynamicMap
              center={ [ 1.344666, 32.655221 ] }
              countryCode={ countryCode }
              onLoad={ onMapLoad }
              range={ range }
              colours={ colours }
              dataPrefix={ options.indicator && options.indicator.value_prefix }
              dataSuffix={ options.indicator && options.indicator.value_suffix }
            />
          </DynamicMapDataLoader>
        </MapSectionBodyMain>
      </MapSectionBody>
    </PageSection>
  );
};

export { MapSection };
