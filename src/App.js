import React from 'react';
import './App.css';
import Chart from './Component/Chart'
import EnterAddress from './Component/EnterAddress';
import axios from 'axios'

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      address: '',
      apiData: [],
      chartData: []
    }
  }

  handleAddressChange = (event) => {
    this.setState({
      address: event.target.value
    })
  }

  handleSearch = () => {
    this.getDetail()
    console.log("===api===", this.state.apiData)
    let heightArray = this.getHeightArray(this.filterChartData(this.state.apiData))
    console.log("===height===", heightArray)
    let amountArray = this.getAmountArray(this.filterChartData(this.state.apiData))
    console.log("===amount===", amountArray)
    this.setState({
      chartData: {
       label: heightArray,
       datasets: [
         {
           label: "amount",
          data: amountArray
         }
       ] 
      }
    })
  }

  getDetail = async () => {
    const { address } = this.state
    await axios.get(`http://47.89.27.192/api/v1/utxo/${address}`, { headers: { 'Content-Type': 'text/plain' } })
      .then(response => {
        console.log("======response====", response.data)
        this.setState({
          apiData: response.data
        })
      })
  };

  // getChartData = () => {
  //   this.setState({
  //     chartData: {
  //       datasets: [
  //         {
  //           label: 'Amount',
  //           data: [
  //             617594,
  //             181045,
  //             153060,
  //             106519,
  //             105162,
  //             95072
  //           ]
  //         },
  //         {
  //           label: 'Height',
  //           data: [
  //             617594,
  //             181045,
  //             153060,
  //             106519,
  //             105162,
  //             95072
  //           ]
  //         }
  //       ]
  //     }
  //   });
  // }

  filterChartData = (apiData) => {
    var filteredChartData = [];
    apiData.forEach(function (data) {
      if (data.vout === 1) {
        filteredChartData.push(data)
      }
    })
    return filteredChartData;
  }

  getHeightArray = (filterChartData) => {
    var heightArray = [];
    filterChartData.forEach(function (data) {
      heightArray.push(data.height);
    })
    return heightArray;
  }

  getAmountArray = (filterChartData) => {
    var amountArray = [];
    filterChartData.forEach(function (data) {
      amountArray.push(data.amount)
    })
    return amountArray;
  }

  render() {
    return (
      <div className="App">
        <EnterAddress
          handleAddressEvent={this.handleAddressChange}
          handleSearch={this.handleSearch} />
        <Chart chartData={this.state.chartData} />
      </div>
    );
  }
}

export default App;
