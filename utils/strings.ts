export interface TemplateOptions {
  location?: string;
  value?: string | number;
}

export const processTemplateString = (text: string, values: TemplateOptions): string => {
  let finalString = text;
  if (values.location) {
    finalString = finalString.replace('{LOCATION}', values.location);
  }

  return finalString;
};

export const toCamelCase = (text: string): string => {
  if (!text) {
    return text;
  }
  if (text.includes('-')) {
    const textArray = text.toLowerCase().split('-');

    return textArray.map(_text => toCamelCase(_text)).join('-');
  } else if (text.includes(' ')) {
    const textArray = text.toLowerCase().split(' ');

    return textArray.map(_text => toCamelCase(_text)).join(' ');
  }
  const textArray = text.toLowerCase().split('');
  textArray[0] = textArray[0].toUpperCase();

  return textArray.join('');
};

export const getSlugFromURL = (url: string): string => {
  const urlBits = url.split('/').filter(slug => !!slug);

  return urlBits[urlBits.length - 1];
};
