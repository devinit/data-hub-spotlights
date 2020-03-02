import chroma, { scale } from 'chroma-js';
import merge from 'deepmerge';
import { Map, MapboxOptions } from 'mapbox-gl';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { PageScaffoldData } from '../components/DefaultLayout';
import { EChartsBaseChart } from '../components/EChartsBaseChart';
import { toBasicAxisData } from '../components/EChartsBaseChart/utils';
import { Legend, LegendItem } from '../components/Legend';
import { PageSection } from '../components/PageSection';
import { SidebarContent, SidebarHeading, SpotlightSidebar } from '../components/SpotlightSidebar';
import { SpotlightTab } from '../components/SpotlightTab';
import { TabContainer } from '../components/SpotlightTab/TabContainer';
import { TabContent } from '../components/SpotlightTab/TabContent';
import { TabContentHeader } from '../components/SpotlightTab/TabContentHeader';
import { Select } from '../components/Select';
import { fetchScaffoldData } from '../utils';
import {
  SpotlightMenu,
  SpotlightMenuList,
  SpotlightMenuListItem,
  SpotlightMenuToggle
} from '../components/SpotlightMenu';
import ugBoundaries from '../boundaries/UG.json';
import SpotlightMenuNav from '../components/SpotlightMenu/SpotlightMenuNav';

interface PlaygroundProps {
  setData?: (data: PageScaffoldData) => void;
  scaffold: PageScaffoldData;
}

const BaseMap = dynamic(() => import('../components/BaseMap').then(mod => mod.BaseMap), {
  ssr: false
});

const Playground: NextPage<PlaygroundProps> = ({ setData, scaffold }) => {
  useEffect(() => {
    if (setData) {
      setData({ ...scaffold });
    }
  }, [setData, scaffold]);

  const options1: ECharts.Options = {
    title: {
      text: 'Basic Bar Chart'
    },
    tooltip: {},
    legend: {
      data: ['Sales', 'Expenses']
    },
    xAxis: {
      data: toBasicAxisData(['Shirt', 'Cardign', 'Chiffon Shirt', 'Pants', 'Heels', 'Socks'])
    },
    yAxis: {},
    series: [
      {
        name: 'Sales',
        type: 'bar',
        data: [5, 20, 36, 15, 10, 25]
      },
      {
        name: 'Expenses',
        type: 'bar',
        data: [2, 30, 3, 40, 20, 36]
      }
    ]
  };

  const options2: ECharts.Options = {
    title: {
      text: 'Inverted Bar Chart - Via Dataset'
    },
    tooltip: {},
    legend: {
      data: ['Sales', 'Expenses']
    },
    xAxis: { type: 'value' },
    yAxis: { type: 'category' },
    series: [{ type: 'bar' }, { type: 'bar' }],
    dataset: {
      source: [
        ['item', 'Sales', 'Expenses'],
        ['Shirt', 5, 2],
        ['Cardigan', 20, 30],
        ['Chiffon Shirt', 34, 23],
        ['Pants', 56, 12]
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
    grid: [{ bottom: '55%' }, { top: '55%' }]
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
        data: toBasicAxisData(['Shirt', 'Cardign', 'Chiffon Shirt', 'Pants', 'Heels', 'Socks'])
      },
      {
        type: 'category',
        gridIndex: 1,
        data: toBasicAxisData(['Shirt', 'Cardign', 'Chiffon Shirt', 'Pants', 'Heels', 'Socks']),
        offset: 20,
        axisTick: { show: false }
      }
    ],
    grid: [{ left: '50%' }, { right: '50%' }]
  });
  options5.legend = {};
  options5.series = [
    {
      type: 'bar',
      data: toBasicAxisData([5, 20, 36, 15, 10, 25])
    },
    {
      type: 'bar',
      data: toBasicAxisData([2, 30, 3, 40, 20, 36]),
      xAxisIndex: 1,
      yAxisIndex: 1
    }
  ];

  const options6: ECharts.Options = {
    title: {
      text: 'Basic Pie Chart'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      data: ['Apples']
    },
    xAxis: undefined,
    yAxis: undefined,
    series: [
      {
        name: 'Sales',
        type: 'pie',
        label: {
          normal: { show: true, formatter: '{a} - {b} : {c} ({d}%)' }
        },
        data: [
          {
            name: 'Apples',
            value: 70
          },
          {
            name: 'Strawberries',
            value: 68
          },
          {
            name: 'Bananas',
            value: 48
          },
          {
            name: 'Oranges',
            value: 40
          },
          {
            name: 'Pears',
            value: 32
          },
          {
            name: 'Pineapples',
            value: 27
          },
          {
            name: 'Grapes',
            value: 18
          }
        ]
      }
    ]
  };

  const [sidebarActive, setSidebarActive] = useState(false);

  const onSidebarHeaderClick = () => {
    setSidebarActive(!sidebarActive);
  };

  const renderLegendItems = () => {
    const ranges = ['<30%', '30% - 50%', '50% - 70%', '70% - 90%', '>90%'];
    const colour = '#8f1b13';
    const lighter = chroma(colour).brighten(3);

    return scale([lighter, colour])
      .colors(5)
      .map((color, index) => (
        <LegendItem bgColor={color} key={index}>
          {ranges[index]}
        </LegendItem>
      ));
  };

  const baseMapOptions: Partial<MapboxOptions> = {
    style: 'mapbox://styles/edwinmp/ck6an0ra90nob1ikvysfmbg15/draft',
    center: [32.655221, 1.344666],
    minZoom: 6,
    zoom: 6.1,
    maxZoom: 7
  };

  const onMapLoad = async (map: Map): Promise<any> => {
    map.addLayer({
      id: 'highlight',
      source: 'composite',
      'source-layer': 'uganda_districts_2019_i-9qg3nj',
      maxzoom: 7,
      type: 'fill',
      // filter: ['==', 'ADM1_EN', 'KOTIDO'],
      paint: {
        'fill-color': {
          property: 'DName2019',
          type: 'categorical',
          default: '#b3adad',
          stops: [
            ['KOTIDO', '#8f1b13'],
            ['KALANGALA', '#333']
          ]
        },
        'fill-opacity': 0.75,
        'fill-outline-color': '#ffffff'
      }
    });
    const mapboxgl = await import('mapbox-gl');
    const popup = new mapboxgl.Popup({
      offset: 5,
      closeOnClick: false,
      closeButton: false
    });
    map.on('mousemove', 'highlight', function(e) {
      map.getCanvas().style.cursor = 'pointer';
      if (e.features?.[0].properties) {
        const geometry = e.features?.[0].geometry;
        if (geometry.type === 'Polygon') {
          const coordinates = geometry.coordinates[0][0];
          popup
            .setLngLat([coordinates[0], coordinates[1]])
            .setHTML('<h3>' + e.features?.[0].properties.DName2019 + '</h3>')
            .addTo(map);
        }
      } else {
        return 'null';
      }
    });
    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'highlight', function() {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });
  };

  const colourOptions = [
    { value: 'ocean', label: 'Ocean', url: '#' },
    { value: 'blue', label: 'Blue', url: '#' },
    { value: 'purple', label: 'Purple', url: '#' },
    { value: 'red', label: 'Red', url: '#' },
    { value: 'orange', label: 'Orange', url: '#' },
    { value: 'yellow', label: 'Yellow', url: '#' },
    { value: 'green', label: 'Green', url: '#' },
    { value: 'forest', label: 'Forest', url: '#' },
    { value: 'slate', label: 'Slate', url: '#' },
    { value: 'silver', label: 'Silver', url: '#' }
  ];

  const flavourOptions = [
    { value: 'vanilla', label: 'Vanilla', url: '#' },
    { value: 'chocolate', label: 'Chocolate', url: '#' },
    { value: 'strawberry', label: 'Strawberry', url: '#' },
    { value: 'salted-caramel', label: 'Salted Caramel', url: '#' }
  ];

  const groupedOptions = [
    {
      label: 'Colours',
      options: colourOptions
    },
    {
      label: 'Flavours',
      options: flavourOptions
    }
  ];

  const [showMenu, setShowMenu] = useState(false);

  const renderMenuItems = (data: any, depth = 1, setActive: (_id: string) => void) => {
    return data.map((location: any, index: number) => {
      const onView = (_event: any, id: string) => {
        setActive(id);
        setShowMenu(false);
      };

      return (
        <SpotlightMenuListItem key={index} title={location.name} depth={depth} onView={onView}>
          {location.children ? (
            <SpotlightMenuList>{renderMenuItems(location.children, depth + 1, setActive)}</SpotlightMenuList>
          ) : null}
        </SpotlightMenuListItem>
      );
    });
  };

  const [activeItem, setActiveItem] = useState('Uganda');
  const onShowMenu = (): void => setShowMenu(!showMenu);
  const onShowAll = (): void => {
    onShowMenu();
    setActiveItem('Uganda');
  };

  return (
    <PageSection>
      <h1>Visualisation Playground</h1>
      <div style={{ display: 'block', paddingBottom: '20px', width: '100%' }}>
        <SpotlightMenu>
          <SpotlightMenuToggle caption={activeItem} show={!showMenu} onClick={onShowMenu} />
          <SpotlightMenuNav caption={'Uganda'} active={showMenu} onClick={onShowMenu} onShowAll={onShowAll}>
            <SpotlightMenuList classNames="countries-menu-list__content">
              {renderMenuItems(ugBoundaries, 1, (item: string) => setActiveItem(item))}
            </SpotlightMenuList>
          </SpotlightMenuNav>
        </SpotlightMenu>
      </div>

      <div style={{ display: 'block', paddingBottom: '20px', width: '100%' }}>
        <Select options={groupedOptions} chooseTheme="dark" placeholder="Select Dark" />
      </div>

      <div style={{ display: 'block', paddingBottom: '20px', width: '100%' }}>
        <Select options={flavourOptions} chooseTheme={'light'} placeholder="Select Light" />
      </div>

      <div style={{ display: 'block', paddingBottom: '20px', width: '100%' }}>
        <BaseMap
          accessToken="pk.eyJ1IjoiZWR3aW5tcCIsImEiOiJjazFsdHVtcG0wOG9mM2RueWJscHhmcXZqIn0.cDR43UvfMaOY9cNJsEKsvg"
          options={baseMapOptions}
          onLoad={onMapLoad}
          width="100%"
        />
      </div>
      <EChartsBaseChart options={options1} />
      <EChartsBaseChart options={options6} />
      <EChartsBaseChart options={options2} height="500px" />
      <EChartsBaseChart options={options3} height="500px" />
      <EChartsBaseChart options={options4} height="800px" />
      <EChartsBaseChart options={options5} height="800px" />

      <div style={{ width: '400px', backgroundColor: '#fff', padding: '20px', marginBottom: '20px' }}>
        <Legend>
          {renderLegendItems()}
          <LegendItem>no data / not applicable</LegendItem>
        </Legend>
      </div>
      <div style={{ marginBottom: '20px', display: 'flex' }}>
        <SpotlightSidebar>
          <SidebarHeading heading="Uganda" onClick={onSidebarHeaderClick} />
          <SidebarContent height="300px"></SidebarContent>
        </SpotlightSidebar>
      </div>
      <div style={{ marginBottom: '20px' }}>
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
    </PageSection>
  );
};

Playground.getInitialProps = async () => {
  const scaffold = await fetchScaffoldData();

  return { scaffold };
};

export default Playground;
