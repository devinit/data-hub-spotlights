import React, { FunctionComponent } from 'react';
import { SpotlightIndicator, SpotlightTheme } from '../../utils';
import { MapSectionHeader } from '../MapSectionHeader';
import { PageSection } from '../PageSection';
import dynamic from 'next/dynamic';
import { MapSectionBody, MapSectionBodyMain } from '../MapSectionBody';
import { SpotlightSidebar } from '../SpotlightSidebar';

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
  const onOptionsChange = (options: SpotlightOptions) => console.log(options);

  return (
    <PageSection>
      <MapSectionHeader themes={ themeData } onOptionsChange={ onOptionsChange }/>
      <MapSectionBody>
        <SpotlightSidebar/>
        <MapSectionBodyMain>
          <DynamicMap center={ [ 1.344666, 32.655221 ] } countryCode={ countryCode }/>
        </MapSectionBodyMain>
      </MapSectionBody>
    </PageSection>
  );
};

export { MapSection };
