import React, { Component } from 'react';
import logo from './img/logo.svg';
import './App.css';
import WebpackLogo from './img/webpack.svg';
import SSLogo from './img/silverstripe-logo.png';
import Chart from 'react-google-charts';
import { withStyles } from 'material-ui/styles';
import { render } from 'react-dom';
import PowerNodeList from './pages/PowerNodeList';
import ExampleChart from './components/ExampleChart';
import BiAxialBarChart from './components/BiAxialBarChart';

const styles = {
  cardHolder: {
    'display': 'flex',
    'align-items': 'center',
    'overflow': 'auto',
    'box-sizing': 'border-box',
    'width': '100%',
    'justify-content': 'center',
    'flex-direction': 'row',
    'flex-wrap': 'wrap',
    'flex-flow': 'row wrap',
    'align-content': 'flex-end'
  }
};

class App extends Component {

  render() {

    const { classes } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={SSLogo} className="ss-logo" alt="logo" />
          <img src={logo} className="App-logo" alt="logo" />
          <img src={WebpackLogo} className="App-logo" alt="logo" />
        </header>

        <PowerNodeList />

        <ExampleChart />

        <BiAxialBarChart />

      </div>
    )
  }
}

// export default App;
export default withStyles(styles)(App)
