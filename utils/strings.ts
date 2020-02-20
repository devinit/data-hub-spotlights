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
