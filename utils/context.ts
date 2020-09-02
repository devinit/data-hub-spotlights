import { createContext, useContext } from 'react';
import { BoundaryDepth, SpotlightLocation } from '.';
import { CountryInfo } from './data';

export const LocationContext = createContext<SpotlightLocation | undefined>(undefined);
export const CountryContext = createContext<CountryInfo>({ countryCode: '', countryName: '', currencyCode: '' });
export const useCountryContext = (): CountryInfo => useContext(CountryContext);
export const BoundaryDepthContext = createContext<BoundaryDepth>('d');
export const useBoundaryDepthContext = (): BoundaryDepth => useContext(BoundaryDepthContext);
