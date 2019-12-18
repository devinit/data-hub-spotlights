import merge from 'deepmerge';
import fetch from 'isomorphic-unfetch';
import { Map, MapboxEvent } from 'mapbox-gl';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import { DefaultLayoutData, Footer, Navigation } from '../components/DefaultLayout';
import { EChartsBaseChart } from '../components/EChartsBaseChart';
import { toBasicAxisData } from '../components/EChartsBaseChart/utils';
import { PageSection } from '../components/PageSection';

const UgandaMap = dynamic(() => import('../components/MapUganda').then(mod => mod.MapUganda));

interface PlaygroundProps {
  setData?: (data: DefaultLayoutData) => void;
  navigation: Navigation;
  footer: Footer;
}

const Playground: NextPage<PlaygroundProps> = ({ footer, navigation, setData }) => {
  useEffect(() => {
    if (setData) {
      setData({ navigation, footer });
    }
  }, [ setData, navigation ]);

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

  const onMapLoad = (map: Map, _event: MapboxEvent) => {
    map.addLayer({
      'id': 'highlight',
      'source': 'composite',
      'source-layer': 'uga_admbnda_adm1_ubos_v2-aa9ehp',
      'maxzoom': 7,
      'type': 'fill',
      // filter: ['==', 'ADM1_EN', 'KOTIDO'],
      'paint': {
          'fill-color': {
              property: 'ADM1_EN',
              type: 'categorical',
              default: '#b3adad',
              stops: [
                  [ 'KOTIDO', '#8f1b13' ]
              ]
          },
          'fill-opacity': 0.75,
          'fill-outline-color': '#ffffff'
      }
    });
  };

  return (
    <PageSection>
      <h1>Visualisation Playground</h1>
      <EChartsBaseChart options={ options1 }/>
      <EChartsBaseChart options={ options2 } height="500px"/>
      <EChartsBaseChart options={ options3 } height="500px"/>
      <EChartsBaseChart options={ options4 } height="800px"/>
      <EChartsBaseChart options={ options5 } height="800px"/>
      <UgandaMap
        accessToken="pk.eyJ1IjoiZWR3aW5tcCIsImEiOiJjazFsdHVtcG0wOG9mM2RueWJscHhmcXZqIn0.cDR43UvfMaOY9cNJsEKsvg"
        onLoad={ onMapLoad }
      />
    </PageSection>
  );
};

Playground.getInitialProps = async () => {
  const res_navigation = await fetch(`${process.env.ASSETS_SOURCE_URL}api/spotlights/navigation/`);
  const navigation = await res_navigation.json();
  const res_footer = await fetch(`${process.env.ASSETS_SOURCE_URL}api/footer/`);
  const footer = await res_footer.json();

  return {
    navigation,
    footer
  };
};

export default Playground;
