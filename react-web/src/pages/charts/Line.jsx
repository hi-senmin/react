import React, { Component } from 'react'

import { Card, Button } from 'antd'
import ReactEcharts from 'echarts-for-react'


export class Line extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lineData: [{
        name: '邮件营销',
        data: [120, 132, 101, 534, 90, 230, 210]
      }, {
        name: '联盟广告',
        data: [220, 182, 391, 334, 290, 730, 310]
      }, {
        name: '视频广告',
        data: [350, 532, 101, 554, 190, 830, 610]
      }, {
        name: '直接访问',
        data: [520, 332, 201, 334, 390, 930, 320]
      }, {
        name: '搜索引擎',
        data: [820, 232, 401, 934, 1290, 1330, 1320]
      }]
    }
  }

  update = () => {
 
  }

  getOption = (lineData) => {
    let selfLegend = lineData.map(item => item.name)
    let selfSeries = lineData.map(item => {
      item.type = 'line'
      return item
    })

    // let y = new Date().getFullYear()
    // let m = new Date().getMonth() + 1
    // let maxDay = new Date(y, m, 0).getDate()

    // console.log('最大天数：', y, m, maxDay)

    // let selfXAxis = [...Array(maxDay + 1).keys()].slice(1)
    let selfXAxis = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

    return {
      title: {
        text: '折线图堆叠'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: selfLegend
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: selfXAxis
      },
      yAxis: {
        type: 'value'
      },
      series: [...selfSeries],
    }
  }

  render() {
    const { lineData } = this.state

    return (
      <div style={{ height: '100%' }}>
        <Card>
          <Button type='primary' onClick={this.update}>更新</Button>
        </Card>

        <Card title='折线图堆叠' >
          <ReactEcharts option={this.getOption(lineData)}></ReactEcharts>
        </Card>
      </div>
    )
  }
}

export default Line
