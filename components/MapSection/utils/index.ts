import chroma, { scale } from 'chroma-js';
import { SpotlightIndicator } from '../../../utils';

export * from './types';

export const parseIndicator = (indicator: SpotlightIndicator): string | undefined => {
  const split = indicator.ddw_id.split('.');

  return split.length ? split[1] : split[0];
};
export const splitByComma = (text?: string) => text ? text.split(',') : [];
export const generateColours = (colours: string[], range: string[]) => {
  if (colours.length > range.length) {
    return colours;
  }

  const baseColor = colours[0] || '#8f1b13'; // base colour taken from pattern library TODO: get one from comms thingie
  const lighter = chroma(baseColor).brighten(3);

  return scale([ lighter, baseColor ]).colors(range.length + 1);
};
