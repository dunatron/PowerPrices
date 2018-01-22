import React, { Component } from 'react';
import { gql, graphql, compose } from 'react-apollo';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import EventCard from '../components/EventCard';
import BiAxialChart from '../components/BiAxialBarChart';
import BubbleChart from '../components/BubbleChart';
import JointLineScatterChart from '../components/JointLineScatterChart';

const styles = theme => ({
  progress: {
    margin: '100px'
  }
});

const PowerNodeQuery = gql`
  query test($before: String!, $after:String!) {
  readPowerNodes {
    edges {
      node {
        ID
        NodeData(BeforeDate: $before, AfterDate: $after) {
          edges {
            node {
              price
            }
          }
        }
      }
    }
  }
}
`;




class PowerNodeList extends Component {
  render () {
    const { classes, data: { loading, readPowerNodes } } = this.props;

    if (loading) {
      return <div><h2>Loading Power Nodes</h2><CircularProgress className={classes.progress} /></div>;
    }

    console.log('READ POWER NODES');
    console.log(readPowerNodes.edges);
    console.log('MAP THE EDGES' );
    // return readPowerNodes.edges.map(edge => {
    //   <BiAxialChart MyData={}/>
    // });

    const PowerNodes = readPowerNodes.edges;

    console.log(PowerNodes);

    return <div>
      <h1>The power Nodes</h1>
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
  graphql(PowerNodeQuery)
)(PowerNodeList);