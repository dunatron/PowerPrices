import React, { Component } from 'react';
import { gql, graphql, compose } from 'react-apollo';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import EventCard from '../components/EventCard';
import BiAxialChart from '../components/BiAxialBarChart';
import BubbleChart from '../components/BubbleChart';
import JointLineScatterChart from '../components/JointLineScatterChart';
import DateRangeGraph from '../components/DateRangeGraph';

const styles = theme => ({
  progress: {
    margin: '100px'
  }
});

// const PowerNodeQuery = gql`
//   query test($before: String!, $after:String!) {
//   readPowerNodes {
//     edges {
//       node {
//         ID
//         NodeData(BeforeDate: $before, AfterDate: $after) {
//           edges {
//             node {
//               price
//             }
//           }
//         }
//       }
//     }
//   }
// }
// `;

const PowerNodeQuery = gql`
  query test($before: String!, $after:String!) {
  readPowerNodes {
    ID
    NodeData(BeforeDate: $before, AfterDate: $after) {
      price
    }
  }
}
`;


const test = gql`
  query test($before: String!, $after:String!) {
  readPowerNodes {
    edges {
      node {
        ID
        NodeID
    		NodeData(BeforeDate: $before, AfterDate: $after) {
      		Interval_datetime
          price
        }
      }
    }
  }
}
`;








class PowerNodeList extends Component {

  componentDidMount() {
    console.log('Congrats PowerNodeList.jsx Component has successfully mounted')
  }

  componentDidUpdate(prevProps) {
    // if(this.props.filter !== prevProps.filter) {
    //   this.fetchData();
    // }
    console.log('Prev props from PowerNodeList.jsx');
    console.log(prevProps)
  }

  componentWillReceiveProps(nextProps) {
    // this.setState({
    //   events: nextProps.events
    // })
    console.log('Next props from PowerNodeList.jsx');
    console.log(nextProps)
  }

  render () {
    const { classes, data: { loading, readPowerNodes } } = this.props;

    if (loading) {
      return <div><h2>Loading Power Nodes</h2><CircularProgress className={classes.progress} /></div>;
    }

    // return readPowerNodes.edges.map(edge => {
    //   <BiAxialChart MyData={}/>
    // });

    const PowerNodes = readPowerNodes.edges;

    return <div>
      <h1>The power Nodes</h1>
      <DateRangeGraph PowerNodes={PowerNodes} />
      <JointLineScatterChart />
      <BubbleChart MyData={PowerNodes} />
      <BiAxialChart MyData={PowerNodes} />
    </div>

    // return readEvents.edges.map(edge => {
    //   return <EventCard event={edge.node} key={edge.node.ID} />;
    // });
  }
}

export default compose(
  withStyles(styles),
  graphql(test)
)(PowerNodeList);