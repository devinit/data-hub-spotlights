import dynamic from 'next/dynamic';
import React, { FunctionComponent, useState } from 'react';
import { SpotlightIndicator, SpotlightTheme } from '../../utils';
import { MapSectionBody, MapSectionBodyMain } from '../MapSectionBody';
import { MapSectionHeader } from '../MapSectionHeader';
import { PageSection } from '../PageSection';
import { SpotlightFilters } from '../SpotlightFilters';
import { SidebarContent, SpotlightSidebar } from '../SpotlightSidebar';
import { SpotlightIndicatorInfo } from '../SpotlightIndicatorInfo';

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

const MapSection: FunctionComponent<MapSectionProps> = ({ countryCode, themes: themeData }) => {
  const [ options, setOptions ] = useState<SpotlightOptions>({});
  const onOptionsChange = (optns: SpotlightOptions) => setOptions(optns);

  return (
    <PageSection>
      <MapSectionHeader themes={ themeData } onOptionsChange={ onOptionsChange }/>

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
          <DynamicMap center={ [ 1.344666, 32.655221 ] } countryCode={ countryCode }/>
        </MapSectionBodyMain>
      </MapSectionBody>
    </PageSection>
  );
};

export { MapSection };
