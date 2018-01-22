import React, { Component } from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const data = [
  {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
  {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
  {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
  {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
  {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
  {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

const realTimeData = [
  {pnode: 'ABY0111', load: 2.956, price: 60.90},
  {pnode: 'ALB0331', load: 119.055, price: 68.88},
  {pnode: 'ALB1101', load: 2.956, price: 60.90},
];

class BiAxialBarChart extends Component{
  render () {

    const {MyData} = this.props;

    console.log('CHAR DATA RECIEVED VIA PROPS');

    console.log(MyData);


    console.log('Try the foreach');
    // MyData.forEach(function (value) {
    //   console.log(value);
    // });






    return (
      <BarChart width={600} height={300} data={realTimeData}
                margin={{top: 20, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey="pnode"/>
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8"/>
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d"/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Bar yAxisId="left" dataKey="load" fill="#8884d8" />
        <Bar yAxisId="right" dataKey="price" fill="#82ca9d" />
      </BarChart>
    );
  }
}

export default BiAxialBarChart
