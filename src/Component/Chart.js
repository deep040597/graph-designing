import React from 'react'
import { Bar, Line } from 'react-chartjs-2'

function Chart(props) {
  console.log("======================props", props)
  return (
    <div>
      <Line
        data={props.chartData}
        options={{}} />
    </div>
  )
}

export default Chart
