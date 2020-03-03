import { SelectTheme } from '../Select';
import { StylesConfig } from 'react-select';
import { CSSProperties } from 'react';

export const getDefaultStyles = (theme: SelectTheme, borderColor: string): StylesConfig => ({
  container: (provided): CSSProperties => ({ ...provided, fontSize: '1.6rem' }),
  control: (provided): CSSProperties =>
    ({
      ...provided,
      ':hover': { borderColor },
      borderColor: '#ddd',
      boxShadow: 'none',
      height: '48px',
      borderRadius: '0'
    } as CSSProperties),
  menu: (provided): CSSProperties =>
    ({
      ...provided,
      color: theme === 'dark' ? '#fff' : '#443e42',
      backgroundColor: theme === 'dark' ? '#443e42' : '#FFFFFF',
      borderRadius: '0',
      'z-index': 15000
    } as CSSProperties),
  option: (provided, state): CSSProperties =>
    ({
      ...provided,
      ':hover': theme === 'dark' ? { cursor: 'pointer' } : { backgroundColor: '#f0826d' },
      backgroundColor: state.isSelected && theme !== 'dark' ? borderColor : 'transparent'
    } as CSSProperties)
});
