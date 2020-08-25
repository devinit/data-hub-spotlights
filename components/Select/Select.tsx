import React, { FunctionComponent } from 'react';
import ReactSelect, {
  components,
  GroupType,
  OptionProps,
  OptionsType,
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';
import { getDefaultStyles } from './utils';

export type SelectOptions = OptionsType<{ label: string; value: string }> | undefined;

export interface SelectOption {
  label: string;
  value: string;
}

export type SelectTheme = 'light' | 'dark';

interface ExtendedSelectProps extends SelectProps {
  chooseTheme?: SelectTheme;
}

export const DarkThemeOption = (props: OptionProps<OptionTypeBase>): JSX.Element => (
  <components.Option {...props}>
    <span>
      {props.children?.toString().toLowerCase()}
      <style jsx>{`
        padding-top: 5px;
        padding-bottom: 5px;
        padding-right: 7px;
        padding-left: 7px;
        background: rgba(143, 27, 19, 0.5);
        color: #fff;
        margin-left: 30px;
        :hover {
          background: rgba(143, 27, 19, 0.75);
        }
      `}</style>
    </span>
  </components.Option>
);

export const DarkThemeGroupLabel = (group: GroupType<OptionTypeBase>): JSX.Element => (
  <div className="select-group-label">
    <span>{group.label}</span>
    <style jsx>{`
      div.select-group-label {
        display: flex;
        align-items: center;
        justify-content: space-between;
        letter-spacing: 1px;
        padding: 0.75rem 0;
        color: #f3f3f3;
        font-size: 1.3rem;
        font-family: 'Geomanist Bold', sans-serif;
      }
    `}</style>
  </div>
);

const Select: FunctionComponent<ExtendedSelectProps> = ({ chooseTheme: theme, styles, ...props }) => {
  const borderColor = '#8f1b13';

  return (
    <ReactSelect
      {...props}
      styles={{ ...getDefaultStyles(theme || 'light', borderColor), ...styles }}
      components={theme === 'dark' ? { Option: DarkThemeOption } : undefined}
      formatGroupLabel={theme === 'dark' ? DarkThemeGroupLabel : undefined}
    />
  );
};

Select.defaultProps = {
  chooseTheme: 'light',
};

export { Select };
