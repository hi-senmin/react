import React from "react"
import ReactEcharts from 'echarts-for-react'

import { Spin } from 'antd';
export default class Bar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      originalData: [{
        title: '1', value: 100
      }, {
        title: '2', value: 200
      }, {
        title: '3', value: 422
      }, {
        title: '4', value: 312
      }, {
        title: '5', value: 763
      }, {
        title: '6', value: 123
      }, {
        title: '7', value: 245
      }, {
        title: '8', value: 854
      }, {
        title: '9', value: 234
      }, {
        title: '10', value: 452
      }, {
        title: '11', value: 522
      }, {
        title: '12', value: 643
      }],

      barData: {
        xData: [],
        yData: []
      }
    }
  }
  componentDidMount() {
    this.getBarData()
  }
  componentWillReceiveProps() {
    this.getBarData()
  }

  getBarData = () => {
    const { originalData } = this.state
    this.setState({
      loading: true,
      xData: [],
      yData: []
    })
    let xData = originalData.map(item => item.title)
    let yData = originalData.map(item => item.value)

    setTimeout(() => {
      this.setState({
        loading: false,
        xData,
        yData
      })
    }, 1000)
  }

  getOption = () => {
    const { xData, yData } = this.state
    return {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          name: '/月',
          nameLocation: 'middle',
          type: 'category',
          data: xData,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '访问量',
          type: 'bar',
          barWidth: '50%',
          data: yData
        }
      ]
    };
  }

  render() {
    const cols = {
      sales: {
        tickInterval: 20
      }
    }
    const { barData } = this.state
    return (
      <div style={{ marginTop: -20 }}>
        <Spin spinning={this.state.loading}>
          <ReactEcharts option={this.getOption()}></ReactEcharts>
        </Spin>
      </div>
    )
  }
}