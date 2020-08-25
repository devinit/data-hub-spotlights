import { addEvent } from '../../../utils/analytics';

export * from './hooks';
export * from './types';
export * from './data';

export const addGTMEvent = (
  sectionHeading: string,
  country: string,
  currency: string,
  year?: number | string,
  budgetType?: string
): void => {
  let eventName = '';
  if (sectionHeading.indexOf('Revenue') !== -1) {
    eventName = 'revenueAndGrantsChartOptionChanged';
  } else if (sectionHeading.indexOf('Expenditure') !== -1) {
    eventName = 'expenditureChartOptionChanged';
  } else if (sectionHeading.indexOf('Financing') !== -1) {
    eventName = 'financingChartOptionChanged';
  }
  addEvent(eventName, {
    budgetType,
    currency,
    year,
    country,
  });
};
