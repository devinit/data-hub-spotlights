import chroma, { scale } from 'chroma-js';
import merge from 'deepmerge';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { PageScaffoldData } from '../components/DefaultLayout';
import { EChartsBaseChart } from '../components/EChartsBaseChart';
import { toBasicAxisData } from '../components/EChartsBaseChart/utils';
import { Legend, LegendItem } from '../components/Legend';
import { PageSection } from '../components/PageSection';
import { SpotlightMenuItem } from '../components/SpotlightMenu';
import { SidebarContent, SidebarHeading, SpotlightSidebar } from '../components/SpotlightSidebar';
import { SpotlightTab } from '../components/SpotlightTab';
import { TabContainer } from '../components/SpotlightTab/TabContainer';
import { TabContent } from '../components/SpotlightTab/TabContent';
import { TabContentHeader } from '../components/SpotlightTab/TabContentHeader';
import { fetchScaffoldData } from '../utils';

interface PlaygroundProps {
  setData?: (data: PageScaffoldData) => void;
  scaffold: PageScaffoldData;
}

const SpotlightMenu = dynamic(
  () => import('../components/SpotlightMenu').then(mod => mod.SpotlightMenu),
  { ssr: false });

const MapContainerWithoutSSR = dynamic(
    () => import('../components/UgandaContainer').then(mod => mod.UgandaContainer),
    { ssr: false });

const Playground: NextPage<PlaygroundProps> = ({ setData, scaffold }) => {
  useEffect(() => {
    if (setData) {
      setData({ ...scaffold });
    }
  }, [ setData, scaffold ]);

  const options1: ECharts.Options = {
    title: {
        text: 'Basic Bar Chart'
    },
    tooltip: {},
    legend: {
        data: [ 'Sales', 'Expenses' ]
    },
    xAxis: {
        data: toBasicAxisData([ 'Shirt', 'Cardign', 'Chiffon Shirt', 'Pants', 'Heels', 'Socks' ])
    },
    yAxis: {},
    series: [
      {
        name: 'Sales',
        type: 'bar',
        data: [ 5, 20, 36, 15, 10, 25 ]
      },
      {
        name: 'Expenses',
        type: 'bar',
        data: [ 2, 30, 3, 40, 20, 36 ]
      }
    ]
  };

  const options2: ECharts.Options = {
    title: {
        text: 'Inverted Bar Chart - Via Dataset'
    },
    tooltip: {},
    legend: {
        data: [ 'Sales', 'Expenses' ]
    },
    xAxis: { type: 'value' },
    yAxis: { type: 'category' },
    series: [
      { type: 'bar' },
      { type: 'bar' }
    ],
    dataset: {
      source : [
        [ 'item', 'Sales', 'Expenses' ],
        [ 'Shirt', 5, 2 ],
        [ 'Cardigan', 20, 30 ],
        [ 'Chiffon Shirt', 34, 23 ],
        [ 'Pants', 56, 12 ]
      ]
    }
  };

  const options3 = merge<ECharts.Options>(options2, {
    title: {
      text: 'Bar Chart - Reverse Axis'
    },
    xAxis: { inverse: true },
    yAxis: { position: 'right' }
  });

  const options4 = merge<ECharts.Options>(options2, {
    title: {
      text: 'Bar Chart Grid v1'
    },
    legend: {},
    xAxis: [
      { type: 'value', gridIndex: 0 },
      { type: 'value', gridIndex: 1 }
    ],
    yAxis: [
      { type: 'category', gridIndex: 0 },
      { type: 'category', gridIndex: 1 }
    ],
    grid: [
        { bottom: '55%' },
        { top: '55%' }
    ]
  });
  options4.legend = {};
  options4.series = [
    { type: 'bar', seriesLayoutBy: 'row' },
    { type: 'bar', seriesLayoutBy: 'row' },
    { type: 'bar', seriesLayoutBy: 'row' },
    { type: 'bar', seriesLayoutBy: 'row' },
    { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
    { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 }
  ];

  const options5 = merge<ECharts.Options>(options1, {
    title: {
      text: 'Bar Chart Grid - Cool Data Comparison'
    },
    xAxis: [
      {
        type: 'value',
        position: 'top'
      },
      {
        type: 'value',
        gridIndex: 1,
        position: 'top',
        inverse: true
      }
    ],
    yAxis: [
      {
        show: false,
        type: 'category',
        data: toBasicAxisData([ 'Shirt', 'Cardign', 'Chiffon Shirt', 'Pants', 'Heels', 'Socks' ])
      },
      {
        type: 'category',
        gridIndex: 1,
        data: toBasicAxisData([ 'Shirt', 'Cardign', 'Chiffon Shirt', 'Pants', 'Heels', 'Socks' ]),
        offset: 20,
        axisTick: { show: false }
      }
    ],
    grid: [
        { left: '50%' },
        { right: '50%' }
    ]
  });
  options5.legend = {};
  options5.series = [
    {
      type: 'bar',
      data: toBasicAxisData([ 5, 20, 36, 15, 10, 25 ])
    },
    {
      type: 'bar',
      data: toBasicAxisData([ 2, 30, 3, 40, 20, 36 ]),
      xAxisIndex: 1,
      yAxisIndex: 1
    }
  ];

  const [ sidebarActive, setSidebarActive ] = useState(false);

  const onSidebarHeaderClick = () => {
    setSidebarActive(!sidebarActive);
  };
  const sidebarItems: SpotlightMenuItem[] = [
    {
      title: 'Level 1',
      children: [
        {
          title: 'Level 1.1'
        },
        {
          title: 'Level 1.2'
        },
        {
          title: 'Level 1.3'
        }
      ]
    },
    {
      title: 'Level 2'
    },
    {
      title: 'Level 3',
      children: [
        {
          title: 'Level 3.1'
        },
        {
          title: 'Level 3.2',
          url: 'https://google.com'
        }
      ]
    }
  ];
  const renderLegendItems = () => {
    const ranges = [ '<30%', '30% - 50%', '50% - 70%', '70% - 90%', '>90%' ];
    const colour = '#8f1b13';
    const lighter = chroma(colour).brighten(3);

    return scale([ lighter, colour ]).colors(5).map(
      (color, index) => <LegendItem bgColor={ color } key={ index }>{ ranges[index] }</LegendItem>);
  };

  return (
    <PageSection>
      <h1>Visualisation Playground</h1>
      <EChartsBaseChart options={ options1 }/>
      <EChartsBaseChart options={ options2 } height="500px"/>
      <EChartsBaseChart options={ options3 } height="500px"/>
      <EChartsBaseChart options={ options4 } height="800px"/>
      <EChartsBaseChart options={ options5 } height="800px"/>

      <div style={ { width: '400px', backgroundColor: '#fff', padding: '20px', marginBottom: '20px' } }>
        <Legend>
          { renderLegendItems() }
          <LegendItem>no data / not applicable</LegendItem>
        </Legend>
      </div>
      <div style={ { marginBottom: '20px', display: 'flex' } }>
        <SpotlightSidebar>
          <SidebarHeading heading="Uganda" onClick={ onSidebarHeaderClick }/>
          <SidebarContent height="300px">
            <SpotlightMenu active={ sidebarActive } items={ sidebarItems }/>
          </SidebarContent>
        </SpotlightSidebar>
      </div>
      <div style={ { marginBottom: '20px' } }>
        <SpotlightTab>
          <TabContainer id="1" label="Tab 1" active>
            <TabContent>
              <TabContentHeader>Tab 1 Content</TabContentHeader>
              <div>Other Content 1</div>
            </TabContent>
          </TabContainer>
          <TabContainer id="2" label="Tab 2">
            <TabContent>
              <TabContentHeader>Tab 2 Content</TabContentHeader>
              <div>Other Content 2</div>
            </TabContent>
          </TabContainer>
        </SpotlightTab>
      </div>

      <div style={ { display: 'block', float: 'left', width: '100%' } }>
        <MapContainerWithoutSSR />
      </div>

    </PageSection>
  );
};

Playground.getInitialProps = async () => {
  const scaffold = await fetchScaffoldData();

  return { scaffold };
};

export default Playground;
