import { Response } from 'express';
import { NextPage } from 'next';
import React from 'react';
import { PageSection } from '../../../../../components/PageSection';
import { fetchSpotlightPage, getBasePathFromContext } from '../../../../../utils';

interface SpotlightPageProps {
  slug: string;
  topic?: string;
  indicator?: string;
}

const Spotlight: NextPage<SpotlightPageProps> = () => {
  return (
    <PageSection>
      <h3 className="section__heading">Redirecting ...</h3>
    </PageSection>
  );
};

Spotlight.getInitialProps = async (context): Promise<SpotlightPageProps> => {
  const { slug, topic, indicator } = context.query;

  if (context.res) {
    const page = await fetchSpotlightPage(slug as string);
    const matchingTopic = page.themes.find(theme => theme.slug === topic);
    if (matchingTopic) {
      const matchingIndicator = matchingTopic.indicators.find(_indicator => _indicator.slug === indicator);
      if (matchingIndicator) {
        (context.res as Response).redirect(
          `${getBasePathFromContext(context)}${slug}/?t=${topic}&i=${matchingIndicator.ddw_id}`
        );
      } else {
        (context.res as Response).redirect(`${getBasePathFromContext(context)}${slug}/?t=${topic}`);
      }
    } else {
      (context.res as Response).redirect(`${getBasePathFromContext(context)}${slug}`);
    }
  }

  return { slug: slug as string, topic: topic as string };
};

export default Spotlight;
