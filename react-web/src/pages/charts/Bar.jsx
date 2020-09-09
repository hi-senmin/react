import React, { Component } from 'react'

import { Card, Button } from 'antd'
import ReactEcharts from 'echarts-for-react'


export class Bar extends Component {
  state = {
    sales: [5, 20, 36, 10, 10, 20], // 销量的数组
    stores: [6, 10, 25, 20, 15, 10], // 库存的数组
  }

  update = () => {
    let sales = this.state.sales

    let stores = this.state.stores.reduce((pre, store, index) => {
      if (store > 0) {
        pre.push(store - 1)
        sales[index]++;
      } else {
        pre.push(store)
      }
      return pre
    }, [])


    this.setState({
      sales,
      stores
    })
  }

  getOption = (sales, stores) => {
    return {
      title: {
        text: 'ECharts'
      },
      tooltip: {},
      legend: {
        data: ['销量', '库存']
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: sales
      }, {
        name: '库存',
        type: 'bar',
        data: stores
      }]
    }
  }


  render() {
    const { sales, stores } = this.state

    return (
      <div>
        <Card>
          <Button type='primary' onClick={this.update}>更新</Button>
        </Card>

        <Card title='柱状图一'>
          <ReactEcharts option={this.getOption(sales, stores)}></ReactEcharts>
        </Card>

      </div>
    )
  }
}

export default Bar
