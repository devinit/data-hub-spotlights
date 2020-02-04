import dynamic from 'next/dynamic';
import React, { FunctionComponent, useState } from 'react';
import { SpotlightIndicator, SpotlightLocation, SpotlightTheme } from '../../utils';
import { MapSectionBody, MapSectionBodyMain } from '../MapSectionBody';
import { MapSectionHeader } from '../MapSectionHeader';
import { PageSection } from '../PageSection';
import { SpotlightFilters } from '../SpotlightFilters';
import { SpotlightIndicatorInfo } from '../SpotlightIndicatorInfo';
import { MapLocations } from '../SpotlightMap';
import { SidebarContent, SpotlightSidebar } from '../SpotlightSidebar';

interface MapSectionProps {
  countryCode: string;
  themes: SpotlightTheme[];
}

export interface SpotlightOptions {
  theme?: SpotlightTheme;
  indicator?: SpotlightIndicator;
  year?: number;
}

const DynamicMap = dynamic(
  () => import('../SpotlightMap').then(mod => mod.SpotlightMap),
  { ssr: false });
const DynamicMapDataLoader = dynamic(
  () => import('../MapDataLoader').then(mod => mod.MapDataLoader),
  { ssr: false });

const parseIndicator = (indicator: SpotlightIndicator): string | undefined => {
  const split = indicator.ddw_id.split('.');

  return split.length ? split[1] : split[0];
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
  console.log(activeLocation);

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
          </SidebarContent>
        </SpotlightSidebar>

        <MapSectionBodyMain>
          <DynamicMapDataLoader
            indicator={ options.indicator && parseIndicator(options.indicator) }
            geocode={ activeLocation && activeLocation.geocode }
            year={ options.year && options.year }
          >
            <DynamicMap center={ [ 1.344666, 32.655221 ] } countryCode={ countryCode } onLoad={ onMapLoad }/>
          </DynamicMapDataLoader>
        </MapSectionBodyMain>
      </MapSectionBody>
    </PageSection>
  );
};

export { MapSection };
