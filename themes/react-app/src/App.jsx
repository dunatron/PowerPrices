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
import moment from 'moment';
import TextField from 'material-ui/TextField'
import axios from 'axios';

import cors from 'cors';

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

  constructor(props) {
    super(props);

    //const {currentDate} = props;

    this.state = {
      beforeDateFilter: "2019-01-22",
      afterDateFilter: "2012-01-22 17:25:00"
    };

  }

  componentDidMount() {
    console.log('Congrats App.jsx Component has successfully mounted')
  }

  componentDidUpdate(prevProps) {
    // if(this.props.filter !== prevProps.filter) {
    //   this.fetchData();
    // }
    console.log('Prev props from App.jsx');
    console.log(prevProps)
  }

  componentWillReceiveProps(nextProps) {
    // this.setState({
    //   events: nextProps.events
    // })
    console.log('Next props from App.jsx');
    console.log(nextProps)
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  render() {


    //
    // let myFetch = axios.create({
    //   crossDomain : true,
    //   "Access-Control-Allow-Origin": "*",
    //   baseURL: 'https://emi.azure-api.net',
    //   timeout: 1000,
    //   headers: {'Ocp-Apim-Subscription-Key': 'bee9281121354f0f97c948d4445e2c6b'}
    //   beforeSend: function(xhrObj){
    //     // Request headers
    //     xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","{subscription key}");
    //   },
    //
    // });
    //
    //
    // myFetch.get('/rtp/?')
    //   .then((response) => {
    //     console.log(response)
    //   });
    // beforeSend: function(xhrObj){
    //   // Request headers
    //   xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","{subscription key}");
    // },

    // $(function() {
    //   var params = {
    //     // Request parameters
    //     "$filter": "{string}",
    //   };
    //
    //   $.ajax({
    //     url: "https://emi.azure-api.net/rtp/?" + $.param(params),
    //     beforeSend: function(xhrObj){
    //       // Request headers
    //       xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","{subscription key}");
    //     },
    //     type: "GET",
    //     // Request body
    //     data: "{body}",
    //   })
    //     .done(function(data) {
    //       alert("success");
    //     })
    //     .fail(function() {
    //       alert("error");
    //     });
    // });



    console.log('Log the State of the app before render');
    console.log(this.state);

    const { classes } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <img src={SSLogo} className="ss-logo" alt="logo" />
          <img src={logo} className="App-logo" alt="logo" />
          <img src={WebpackLogo} className="App-logo" alt="logo" />
        </header>

        <TextField
          id="name"
          label="beforeDateFilter"
          className={classes.textField}
          value={this.state.beforeDateFilter}
          onChange={this.handleChange('beforeDateFilter')}
          margin="normal"
        />

        <TextField
          id="name"
          label="afterDateFilter"
          className={classes.textField}
          value={this.state.afterDateFilter}
          onChange={this.handleChange('afterDateFilter')}
          margin="normal"
        />

        <PowerNodeList before={this.state.beforeDateFilter} after={this.state.afterDateFilter} />

        <ExampleChart />

        {/*<BiAxialBarChart />*/}

      </div>
    )
  }
}

// export default App;
export default withStyles(styles)(App)
