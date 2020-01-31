import React, { FunctionComponent } from 'react';
import { SpotlightIndicator, SpotlightTheme } from '../../utils';
import { MapSectionHeader } from '../MapSectionHeader';
import { PageSection } from '../PageSection';
import dynamic from 'next/dynamic';

interface MapSectionProps {
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

const MapSection: FunctionComponent<MapSectionProps> = ({ themes: themeData }) => {
  const onOptionsChange = (options: SpotlightOptions) => console.log(options);

  return (
    <PageSection>
      <MapSectionHeader themes={ themeData } onOptionsChange={ onOptionsChange }/>
      <DynamicMap center={ [ 1.344666, 32.655221 ] } countryCode="UG"/>
    </PageSection>
  );
};

export { MapSection };
