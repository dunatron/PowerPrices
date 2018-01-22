import { Chart } from 'react-google-charts';
import React from 'react';

class ExampleChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        ['Galaxy', 'Distance', 'Brightness'],
        ['Canis Major Dwarf', 8000, 8000],
        ['Sagittarius Dwarf', 24000, 8000],
        ['Ursa Major II Dwarf', 30000, 8000],
      ],
      width: '800',
      chart: {
        title: 'Nearby galaxies',
        subtitle: 'distance on the left, brightness on the right'
      },
      bars: 'horizontal', // Required for Material Bar Charts.
      series: {
        0: { axis: 'Price' }, // Bind series 0 to an axis named 'distance'.
        1: { axis: 'Load' } // Bind series 1 to an axis named 'brightness'.
      },
      axes: {
        x: {
          distance: {label: 'parsecs'}, // Bottom x-axis.
          brightness: {side: 'top', label: 'apparent magnitude'} // Top x-axis.
        }
      }
    };
  }
  render() {
    return (
      <Chart
        chartType="BarChart"
        bars={this.state.bars}
        data={this.state.data}
        options={this.state.options}
        graph_id="ScatterChart"
        width={this.state.width}
        height={this.state.height}
        axes={this.state.axes}
        legend_toggle
      />
    );
  }
}
export default ExampleChart;