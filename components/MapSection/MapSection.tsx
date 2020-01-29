import React, { FunctionComponent } from 'react';
import { SpotlightIndicator, SpotlightTheme } from '../../utils';
import { MapSectionHeader } from '../MapSectionHeader';
import { PageSection } from '../PageSection';

interface MapSectionProps {
  themes: SpotlightTheme[];
}

export interface SpotlightOptions {
  indicator?: SpotlightIndicator;
  year?: number;
}

const MapSection: FunctionComponent<MapSectionProps> = ({ themes: themeData }) => {
  const onOptionsChange = (options: SpotlightOptions) => console.log(options);

  return (
    <PageSection>
      <MapSectionHeader themes={ themeData } onOptionsChange={ onOptionsChange }/>
    </PageSection>
  );
};

export { MapSection };
