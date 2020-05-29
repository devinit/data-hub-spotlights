import { Response } from 'express';
import { NextPage } from 'next';
import React from 'react';
import { PageSection } from '../../../../components/PageSection';

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
  const { slug, topic } = context.query;

  if (context.res) {
    (context.res as Response).redirect(`/spotlight/${slug}/?t=${topic}`);
  }

  return { slug: slug as string, topic: topic as string };
};

export default Spotlight;
