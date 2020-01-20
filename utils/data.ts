import fetch from 'isomorphic-unfetch';
import { Footer, Navigation } from '../components/DefaultLayout';

export interface PageScaffoldData {
  navigation: Navigation;
  footer: Footer;
}

export const fetchScaffoldData = async (): Promise<PageScaffoldData> => {
  const res_navigation = await fetch(`${process.env.ASSETS_SOURCE_URL}api/spotlights/navigation/`);
  const navigation = await res_navigation.json();
  const res_footer = await fetch(`${process.env.ASSETS_SOURCE_URL}api/footer/`);
  const footer = await res_footer.json();

  return { navigation, footer };
};
