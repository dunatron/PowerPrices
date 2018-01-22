import React, { Component } from 'react';
import {ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import moment from 'moment';

const data01 = [
  {time: 0.00, price: 42.61},
  {time: 0.30, price: 43.61},
  {time: 1.00, price: 44.61},
  {time: 1.30, price: 49.61},
  {time: 2.00, price: 51.61},
  {time: 2.30, price: 53.61},
  {time: 3.00, price: 68.61},
  {time: 3.30, price: 68.61},
  {time: 4.00, price: 58.61},
  {time: 4.30, price: 62.61},
  {time: 5.00, price: 68.61},
  {time: 5.30, price: 72.61},
  {time: 6.00, price: 68.30},
  {time: 6.30, price: 68.61},
  {time: 7.00, price: 68.61},
  {time: 7.30, price: 52.61},
  {time: 8.00, price: 48.61},
  {time: 8.30, price: 66.68},
  {time: 9.00, price: 68.61},
  {time: 9.30, price: 68.61},
  {time: 10.00, price: 68.61},
  {time: 10.30, price: 68.61},
  {time: 11.00, price: 68.61},
  {time: 11.30, price: 68.61},
  {time: 12.00, price: 68.61},
  {time: 12.30, price: 68.61},
  {time: 13.00, price: 68.61},
  {time: 13.30, price: 68.61},
  {time: 14.00, price: 68.61},
  {time: 14.30, price: 68.61},
  {time: 15.00, price: 68.61},
  {time: 15.30, price: 68.61},
  {time: 16.00, price: 68.61},
  {time: 16.30, price: 68.61},
  {time: 17.00, price: 68.61},
  {time: 17.30, price: 68.61},
  {time: 18.00, price: 68.61},
  {time: 18.30, price: 68.61},
  {time: 19.00, price: 68.61},
  {time: 19.30, price: 68.61},
  {time: 20.00, price: 68.61},
  {time: 20.30, price: 68.61},
  {time: 21.00, price: 68.61},
  {time: 21.30, price: 68.61},
  {time: 22.00, price: 68.61},
  {time: 22.30, price: 68.61},
  {time: 23.00, price: 68.61},
  {time: 23.30, price: 68.61},]

const data02 = [
  {time: 0.00, price: 40.14, extra: 400},
  {time: 0.30, price: 42.34},
  {time: 1.00, price: 43.89},
  {time: 1.30, price: 55.65},
  {time: 2.00, price: 50.45},
  {time: 2.30, price: 48.88},
  {time: 3.00, price: 48.90},
  {time: 3.30, price: 50.22},
  {time: 4.00, price: 51.22},
  {time: 4.30, price: 51.23},
  {time: 5.00, price: 54.65},
  {time: 5.30, price: 54.65},
  {time: 6.00, price: 54.65},
  {time: 6.30, price: 54.65},
  {time: 7.00, price: 54.65},
  {time: 7.30, price: 54.65},
  {time: 8.00, price: 54.65},
  {time: 8.30, price: 54.65},
  {time: 9.00, price: 54.65},
  {time: 9.30, price: 54.65},
  {time: 10.00, price: 54.65},
  {time: 10.30, price: 54.65},
  {time: 11.00, price: 54.65},
  {time: 11.30, price: 54.65},
  {time: 12.00, price: 54.65},
  {time: 12.30, price: 54.65},
  {time: 13.00, price: 54.65},
  {time: 13.30, price: 54.65},
  {time: 14.00, price: 54.65},
  {time: 14.30, price: 54.65},
  {time: 15.00, price: 54.65},
  {time: 15.30, price: 54.65},
  {time: 16.00, price: 54.65},
  {time: 16.30, price: 54.65},
  {time: 17.00, price: 54.65},
  {time: 17.30, price: 54.65},
  {time: 18.00, price: 54.65},
  {time: 18.30, price: 54.65},
  {time: 19.00, price: 54.65},
  {time: 19.30, price: 54.65},
  {time: 20.00, price: 54.65},
  {time: 20.30, price: 54.65},
  {time: 21.00, price: 54.65},
  {time: 21.30, price: 54.65},
  {time: 22.00, price: 54.65},
  {time: 22.30, price: 54.65},
  {time: 23.00, price: 54.65},
  {time: 23.30, price: 54.65},]

const data03 = [
  {time: 0.00, price: "40.14", extra: 400},
  {time: 0.30, price: "42.34"},
  {time: 1.00, price: "43.89"},
  {time: 1.30, price: "55.65"},
  {time: 2.00, price: "50.45"},
  {time: 2.30, price: "48.88"},
  {time: 3.00, price: "48.90"},
]


class DateRangeGraph extends Component{

  render () {

    const {PowerNodes} = this.props;


    console.group("Test Mapping of power Nodes");


    // Transform data do be consumed by Graph
    let smallData = PowerNodes.map((d,i) => {
      console.log('Is Object extensible?', Object.isExtensible(d.node.NodeData));

      // price need to be an Int, time needs to ...something else
      let NewNodeData = d.node.NodeData.map((d, i) => {
        let convertPrice = parseInt(d.price);
        return {
          price: convertPrice,
          Interval_datetime: d.Interval_datetime
        }
      });

      return {
        dbID: d.node.ID,
        powerNodeID: d.node.NodeID,
        nodeData: NewNodeData,
      };
    });

    // Console log test data
    console.group('TEST DATA');
    console.log(data02);
    console.groupEnd();


    // console log original & transformed data
    console.group("Test Mapping of power Nodes");
    console.log(PowerNodes);
    console.log(smallData);
    console.groupEnd();

    // Each Power node will have a set of data.
    // We need to use moment() to convert the time give ('2015-07-23T17:25:00')
    // Or rather extract them

    // ('2015-07-23T17:25:00') || 23-JUL-2015 17:25
    const day = moment("2015-07-23T17:25:00").day(); // 4
    const hour = moment("2015-07-23T17:25:00").hour(); // 17
    const minute = moment("2015-07-23T17:25:00").minute(); // 25

    console.group("Moment Test");
    console.log('%c moment day value', 'color: gray', day);
    console.log('%c moment hour value', 'color: blue', hour);
    console.log('%c moment minute value', 'color: blue', minute);
    console.groupEnd();


    return (
      <ScatterChart width={600} height={400} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
        <XAxis type="number" dataKey={'price'} name='stature' unit='Hr'/>
        <YAxis type="number" dataKey={'price'} name='weight' unit='$'/>
        <ZAxis range={[100]}/>
        <CartesianGrid />
        <Tooltip cursor={{strokeDasharray: '3 3'}}/>
        <Legend/>
        {/*<Scatter name="TEST" data={data03} fill='#8884d8' line shape="cross"/>*/}

        {/*{PowerNodes.map((powerNode, index) =>*/}
          {/*<Scatter name={powerNode.node.NodeID} data={powerNode.node.NodeData} key={index} fill='#8884d8' line shape="cross"/>*/}
        {/*)}*/}

        {smallData.map((d,i) =>
          <Scatter name={d.powerNodeID} data={d.nodeData} key={i} fill='#8884d8' line shape="cross"/>
        )}



        {/*<Scatter name='ABY0111' data={data01} fill='#8884d8' line shape="cross"/>*/}
        {/*<Scatter name='ALB0331' data={data02} fill='#82ca9d' line shape="diamond"/>*/}
      </ScatterChart>
    );
  }
}

export default DateRangeGraph;