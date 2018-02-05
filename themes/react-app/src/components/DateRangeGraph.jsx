import React, { Component } from 'react';
import {ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import moment from 'moment';

class DateRangeGraph extends Component{

  render () {

    const {PowerNodes} = this.props;

    // Each Power node will have a set of data.
    // We need to use moment() to convert the time give ('2015-07-23T17:25:00')
    // Or rather extract them

    // // ('2015-07-23T17:25:00') || 23-JUL-2015 17:25
    // const day = moment("2015-07-23T17:25:00").day(); // 4
    // const hour = moment("2015-07-23T17:25:00").hour(); // 17
    // const minute = moment("2015-07-23T17:25:00").minute(); // 25
    // const unix = moment("2015-07-23T17:25:00").unix();



    // console.group("Moment Test");
    // console.log('%c moment day value', 'color: gray', day);
    // console.log('%c moment hour value', 'color: blue', hour);
    // console.log('%c moment minute value', 'color: blue', minute);
    // console.log('%c MOMENT UNIX VALUE', 'color: purple', unix);
    // console.groupEnd();


    // Transform data to be consumed by Graph
    let smallData = PowerNodes.map((d,i) => {
      console.log('Is Object extensible?', Object.isExtensible(d.node.NodeData));

      // price need to be an Int, time needs to ...something else
      let NewNodeData = d.node.NodeData.map((d, i) => {
        let convertPrice = parseInt(d.price);
        // let timeStamp = moment(d.Interval_datetime).unix();
        let minute = moment(d.Interval_datetime).minute();
        let hour = moment(d.Interval_datetime).hour();

        const timeVal = `${hour}${minute}`;

        let c = String(hour) + '.' + String(minute);

        console.group('TIME STUFF');
        console.log(timeVal);
        console.groupEnd();

        let convertBack = parseFloat(c);

        return {
          price: convertPrice,
          Interval_datetime: convertBack
        }
      });

      let color ="#8884d8";

      if(d.node.BgColor) {
        color ="#" + d.node.BgColor;
      }

      return {
        dbID: d.node.ID,
        color: color,
        powerNodeID: d.node.NodeID,
        nodeData: NewNodeData,
      };

    });

    // console log original & transformed data
    console.group("Test Mapping of power Nodes");
    console.log(PowerNodes);
    console.log(smallData);
    console.groupEnd();


    return (
      <ScatterChart width={1000} height={900} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
        <XAxis type="number" dataKey={'Interval_datetime'} name='seconds since the Unix Epoch' unit='sec'/>
        <YAxis type="number" dataKey={'price'} name='price' unit='$'/>
        {/*<ZAxis range={[5]}/>*/}
        <ZAxis dataKey="z" range={[5, 300]} name="score" unit="km" /><ZAxis dataKey="z" range={[64, 144]} name="score" unit="km" />
        <CartesianGrid />
        <Tooltip cursor={{strokeDasharray: '3 3'}}/>
        <Legend/>
        {/*<Scatter name="TEST" data={data03} fill='#8884d8' line shape="cross"/>*/}

        {/*{PowerNodes.map((powerNode, index) =>*/}
          {/*<Scatter name={powerNode.node.NodeID} data={powerNode.node.NodeData} key={index} fill='#8884d8' line shape="cross"/>*/}
        {/*)}*/}

        {smallData.map((d,i) =>
          <Scatter name={d.powerNodeID} data={d.nodeData} key={i} fill={d.color} line shape="cross"/>
        )}



        {/*<Scatter name='ABY0111' data={data01} fill='#8884d8' line shape="cross"/>*/}
        {/*<Scatter name='ALB0331' data={data02} fill='#82ca9d' line shape="diamond"/>*/}
      </ScatterChart>
    );
  }
}

export default DateRangeGraph;