import React, { FunctionComponent, ReactNode, useContext, useEffect, useState } from 'react';
import {
  BudgetType,
  CountryContext,
  createYearOptionsFromRange,
  LocationContext,
  processTemplateString,
  SpotlightIndicator,
  toCamelCase,
  useCountryContext
} from '../../utils';
import { Alert } from '../Alert';
import { CurrencySelector } from '../CurrencySelector';
import { FormField } from '../FormField';
import { FormFieldSelect } from '../FormFieldSelect';
import { Icon } from '../Icon';
import { Loading } from '../Loading';
import { PageSection, PageSectionHeading } from '../PageSection';
import { RevenueExpenditureLineChart } from '../RevenueExpenditureLineChart';
import { RevenueExpenditureTreeMap } from '../RevenueExpenditureTreeMap';
import { SelectOption } from '../Select';
import { SpotlightBanner, SpotlightBannerAside, SpotlightBannerForm, SpotlightBannerMain } from '../SpotlightBanner';
import { SpotlightInteractive } from '../SpotlightInteractive';
import { SpotlightSidebar } from '../SpotlightSidebar';
import { VisualisationSection, VisualisationSectionMain } from '../VisualisationSection';
import { getIndicatorContentOptions, parseBudgetType, useRevenueExpenditureData } from './utils';
import { addEvent } from '../../utils/analytics';

interface RevenueSectionProps {
  indicator: SpotlightIndicator;
}

const renderPaddedAlert = (message: string): ReactNode => (
  <div>
    <Alert variant="error">
      <Icon name="error-error" />
      <p>{message}</p>
    </Alert>
    <style jsx>{`
      div {
        padding: 8px;
      }
    `}</style>
  </div>
);

const addGTMEvent = (
  sectionHeading: string,
  budgetType: BudgetType | undefined,
  currency: string,
  year: number | string | undefined,
  country: string
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
    country
  });
};

const RevenueExpenditureSection: FunctionComponent<RevenueSectionProps> = ({ indicator }) => {
  const { countryCode, countryName, currencyCode } = useContext(CountryContext);
  const location = useContext(LocationContext);
  const [useLocalValue, setUseLocalValue] = useState(false);
  const [year, setYear] = useState<number | undefined>(indicator.end_year && indicator.end_year);
  const [budgetTypes, setBudgetTypes] = useState<BudgetType[]>([]);
  const [selectedBudgetType, setSelectedBudgetType] = useState<BudgetType | undefined>(undefined);
  const { data, dataLoading, options, setOptions, error } = useRevenueExpenditureData(
    {
      indicators: [indicator.ddw_id],
      geocodes: location ? [location.geocode] : [countryCode],
      limit: 10000
    },
    indicator
  );

  const setYearBudgetTypes = (): void => {
    if (year && data.hasOwnProperty(year)) {
      const _budgetTypes = Object.keys(data[year]) as BudgetType[];
      setBudgetTypes(_budgetTypes);
      setSelectedBudgetType(_budgetTypes[0]);
    }
  };
  useEffect(() => {
    setOptions({
      ...options,
      geocodes: location ? [location.geocode] : [countryCode],
      indicators: [indicator.ddw_id]
    });
    setYear(indicator.end_year);
  }, [location]);
  useEffect(() => {
    if (!dataLoading) {
      setYearBudgetTypes();
    }
  }, [dataLoading]);
  const countryContext = useCountryContext();
  const sectionHeading = processTemplateString(indicator.name, {
    location: location ? toCamelCase(location.name) : countryName
  });

  if (!dataLoading && !selectedBudgetType) {
    setYearBudgetTypes();
  }

  const onChangeCurrency = (isLocal: boolean): void => {
    setUseLocalValue(isLocal);
    addGTMEvent(sectionHeading, selectedBudgetType, isLocal ? 'UGX' : 'USD', year, countryContext.countryName);
  };
  const onSelectYear = (option?: SelectOption): void => {
    if (option) {
      setYear(parseInt(option.value));
      if (data && data[option.value]) {
        const _budgetTypes = Object.keys(data[option.value]) as BudgetType[];
        setBudgetTypes(_budgetTypes);
        setSelectedBudgetType(_budgetTypes[0]);
        addGTMEvent(
          sectionHeading,
          _budgetTypes[0],
          useLocalValue ? 'UGX' : 'USD',
          option.value,
          countryContext.countryName
        );
      }
    } else {
      setYear(undefined);
      setBudgetTypes([]);
    }
  };
  const onChangeBudgetType = (option?: SelectOption): void => {
    if (option) {
      setSelectedBudgetType(option.value as BudgetType);
      addGTMEvent(
        sectionHeading,
        option.value as BudgetType,
        useLocalValue ? 'UGX' : 'USD',
        year,
        countryContext.countryName
      );
    } else {
      setSelectedBudgetType(undefined);
    }
  };

  return (
    <PageSection>
      <PageSectionHeading>{sectionHeading}</PageSectionHeading>

      <SpotlightBanner className="spotlight-banner--alt">
        <SpotlightBannerAside>
          <FormField className="form-field--inline">
            <FormFieldSelect
              label="Year"
              options={createYearOptionsFromRange(indicator.start_year, indicator.end_year, indicator.excluded_years)}
              value={year ? { label: `${year}`, value: `${year}` } : null}
              onChange={onSelectYear}
            />
          </FormField>
          <FormField className="form-field--inline">
            <FormFieldSelect
              label="Budget Type"
              options={budgetTypes.map(type => ({ label: parseBudgetType(type), value: type }))}
              value={
                selectedBudgetType ? { label: parseBudgetType(selectedBudgetType), value: selectedBudgetType } : null
              }
              isLoading={dataLoading}
              isDisabled={dataLoading}
              onChange={onChangeBudgetType}
            />
          </FormField>
        </SpotlightBannerAside>
        <SpotlightBannerMain>
          <SpotlightBannerForm>
            <FormField className="form-field--inline">
              <CurrencySelector currencyCode={currencyCode} width="100%" onChange={onChangeCurrency} />
            </FormField>
          </SpotlightBannerForm>
        </SpotlightBannerMain>
      </SpotlightBanner>

      <VisualisationSection>
        <SpotlightSidebar>
          <SpotlightInteractive background="#ffffff">
            {error && !dataLoading ? (
              renderPaddedAlert('Something went wrong while loading this widget')
            ) : (
              <Loading active={dataLoading}>
                <div>
                  <RevenueExpenditureLineChart
                    data={data}
                    budgetType={selectedBudgetType}
                    valueOptions={{
                      dataFormat: 'currency',
                      useLocalValue,
                      prefix: useLocalValue ? currencyCode : indicator.value_prefix,
                      suffix: indicator.value_suffix
                    }}
                    selectedYear={year}
                  />
                  <style jsx>{`
                    padding: 0 10px;
                  `}</style>
                </div>
              </Loading>
            )}
          </SpotlightInteractive>
        </SpotlightSidebar>
        <VisualisationSectionMain>
          <SpotlightInteractive background="#ffffff">
            {error && !dataLoading ? (
              renderPaddedAlert('Something went wrong while loading this widget')
            ) : (
              <Loading active={dataLoading}>
                <RevenueExpenditureTreeMap
                  data={
                    data && year && data.hasOwnProperty(year) && selectedBudgetType
                      ? data[year][selectedBudgetType]
                      : []
                  }
                  budgetType={selectedBudgetType}
                  config={getIndicatorContentOptions(indicator)}
                  valueOptions={{
                    dataFormat: 'currency',
                    useLocalValue,
                    prefix: useLocalValue ? currencyCode : indicator.value_prefix,
                    suffix: indicator.value_suffix
                  }}
                />
              </Loading>
            )}
          </SpotlightInteractive>
        </VisualisationSectionMain>
      </VisualisationSection>
    </PageSection>
  );
};

export { RevenueExpenditureSection };
