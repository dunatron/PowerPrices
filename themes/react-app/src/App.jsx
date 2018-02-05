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
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import axios from 'axios';


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

    this.setLastHour = this.setLastHour.bind(this);
    //this.setLastHour = this.setLastHour.bind(this);

  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {

  }

  componentWillReceiveProps(nextProps) {

  }

  // good for handling state change on text bindings
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  setLastHour() {
    let time = moment();
    console.log(time)
    this.setState({
      beforeDateFilter: "2050-01-22"
    })
  }


  render() {


    //
    // let myFetch = axios.create({
    //   crossDomain : true,
    //   "Access-Control-Allow-Origin": "*",
    //   baseURL: 'https://emi.azure-api.net',
    //   timeout: 1000,
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'subscription-key': 'bee9281121354f0f97c948d4445e2c6b',
    //     'Ocp-Apim-Subscription-Key': 'bee9281121354f0f97c948d4445e2c6b'}
    // });
    //
    // myFetch.get('/rtp/?subscription-key=bee9281121354f0f97c948d4445e2c6b')
    //   .then((response) => {
    //     console.log(response)
    //   }).catch((err)=> {
    //     console.log(err)
    // });


    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Ocp-Apim-Subscription-Key': 'bee9281121354f0f97c948d4445e2c6b',
        "Access-Control-Allow-Origin": "*",
      }
    };

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://emi.azure-api.net/rtp"; // site that doesn’t send Access-Control-*
    axios.get(proxyurl + url, axiosConfig)
      .then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });


    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    // const url = "https://emi.azure-api.net/rtp"; // site that doesn’t send Access-Control-*
    //
    // axios(proxyurl + url, {
    //   method: 'POST',
    //   // mode: 'no-cors',
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/json',
    //     'Ocp-Apim-Subscription-Key': 'bee9281121354f0f97c948d4445e2c6b'
    //   },
    //   // withCredentials: true,
    //   // credentials: 'same-origin',
    // }).then(response => {
    //   console.log(response)
    // })


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

        <Button raised color="primary" className={classes.button} onClick={this.setLastHour}>
          Last hour
        </Button>

        <Button raised color="primary" className={classes.button} onClick={this.setLastWeek}>
          Last Week
        </Button>

        <PowerNodeList before={this.state.beforeDateFilter} after={this.state.afterDateFilter} />

        <ExampleChart />

        {/*<BiAxialBarChart />*/}

      </div>
    )
  }
}

// export default App;
export default withStyles(styles)(App)
