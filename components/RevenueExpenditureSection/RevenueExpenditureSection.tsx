import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  BudgetType,
  createYearOptionsFromRange,
  processTemplateString,
  SpotlightIndicator,
  SpotlightLocation,
  toCamelCase
} from '../../utils';
import { CurrencySelector } from '../CurrencySelector';
import { FormField } from '../FormField';
import { FormFieldSelect } from '../FormFieldSelect';
import { Loading } from '../Loading';
import { PageSection, PageSectionHeading } from '../PageSection';
import { RevenueExpenditureLineChart } from '../RevenueExpenditureLineChart';
import { SelectOption } from '../Select';
import { SpotlightBanner, SpotlightBannerAside, SpotlightBannerForm, SpotlightBannerMain } from '../SpotlightBanner';
import { SpotlightInteractive } from '../SpotlightInteractive';
import { SpotlightSidebar } from '../SpotlightSidebar';
import { VisualisationSection, VisualisationSectionMain } from '../VisualisationSection';
import { useRevenueExpenditureData } from './utils';

interface SelectType {
  label: string;
  value: string;
}

interface RevenueSectionProps {
  countryCode: string;
  countryName: string;
  currencyCode: string;
  indicator: SpotlightIndicator;
  location?: SpotlightLocation;
  budgetTypeOptions?: SelectType[];
}

const RevenueExpenditureSection: FunctionComponent<RevenueSectionProps> = ({ indicator, location, ...props }) => {
  const [useLocalValue, setUseLocalValue] = useState(false);
  const [year, setYear] = useState<number | undefined>(indicator.start_year && indicator.start_year);
  const [budgetTypes, setBudgetTypes] = useState<BudgetType[]>([]);
  const [selectedBudgetType, setSelectedBudgetType] = useState<BudgetType | undefined>(undefined);
  const { data, dataLoading, options, setOptions } = useRevenueExpenditureData(
    {
      indicators: [indicator.ddw_id],
      geocodes: location ? [location.geocode] : [props.countryCode],
      limit: 10000
    },
    indicator
  );
  useEffect(() => {
    setOptions({
      ...options,
      geocodes: location ? [location.geocode] : [props.countryCode],
      indicators: [indicator.ddw_id]
    });
  }, [location]);
  useEffect(() => {
    if (!dataLoading && year && data.hasOwnProperty(year)) {
      const _budgetTypes = Object.keys(data[year]) as BudgetType[];
      setBudgetTypes(_budgetTypes);
      setSelectedBudgetType(_budgetTypes[0]);
    }
  }, [dataLoading]);

  const onChangeCurrency = (isLocal: boolean): void => setUseLocalValue(isLocal);
  const onSelectYear = (option?: SelectOption): void => {
    if (option) {
      setYear(parseInt(option.value));
      if (data && data[option.value]) {
        const _budgetTypes = Object.keys(data[option.value]) as BudgetType[];
        setBudgetTypes(_budgetTypes);
        setSelectedBudgetType(_budgetTypes[0]);
      }
    } else {
      setYear(undefined);
      setBudgetTypes([]);
    }
  };

  return (
    <PageSection>
      <PageSectionHeading>
        {processTemplateString(indicator.name, { location: location ? location.name : props.countryName })}
      </PageSectionHeading>

      <SpotlightBanner className="spotlight-banner--alt">
        <SpotlightBannerAside>
          <FormField className="form-field--inline">
            <FormFieldSelect
              label="Year"
              options={createYearOptionsFromRange(indicator.start_year, indicator.end_year)}
              defaultValue={
                indicator.start_year ? { label: `${indicator.start_year}`, value: `${indicator.start_year}` } : null
              }
              onChange={onSelectYear}
            />
          </FormField>
          <FormField className="form-field--inline">
            <FormFieldSelect
              label="Budget Type"
              options={budgetTypes.map(type => ({ label: toCamelCase(type), value: type }))}
              value={budgetTypes.length ? { label: toCamelCase(budgetTypes[0]), value: budgetTypes[0] } : null}
              isLoading={dataLoading}
              isDisabled={dataLoading}
            />
          </FormField>
        </SpotlightBannerAside>
        <SpotlightBannerMain>
          <SpotlightBannerForm>
            <FormField className="form-field--inline">
              <CurrencySelector currencyCode={props.currencyCode} width="100%" onChange={onChangeCurrency} />
            </FormField>
          </SpotlightBannerForm>
        </SpotlightBannerMain>
      </SpotlightBanner>

      <VisualisationSection>
        <SpotlightSidebar>
          <SpotlightInteractive>
            <Loading active={dataLoading}>
              <RevenueExpenditureLineChart
                data={data}
                budgetType={selectedBudgetType}
                useLocalCurrency={useLocalValue}
              />
            </Loading>
          </SpotlightInteractive>
        </SpotlightSidebar>
        <VisualisationSectionMain>
          <SpotlightInteractive />
        </VisualisationSectionMain>
      </VisualisationSection>
    </PageSection>
  );
};

export { RevenueExpenditureSection };
