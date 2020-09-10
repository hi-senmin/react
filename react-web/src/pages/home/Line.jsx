import React, { Component } from 'react'
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from "bizcharts"
import DataSet from "@antv/data-set"

export default class Line extends Component {

  render() {
    const data = [
      {
        month: "1",
        a: 7.0,
        b: 3.9,
        c: 5.9
      },
      {
        month: "2",
        a: 6.9,
        b: 4.2,
        c: 1.9
      },
      {
        month: "3",
        a: 9.5,
        b: 5.7,
        c: 3.9
      },
      {
        month: "4",
        a: 14.5,
        b: 8.5,
        c: 5.5
      },
      {
        month: "5",
        a: 18.4,
        b: 11.9,
        c: 8.9
      },
      {
        month: "6",
        a: 21.5,
        b: 15.2,
        c: 10.0
      },
      {
        month: "7",
        a: 25.2,
        b: 17.0,
        c: 12.9
      },
      {
        month: "8",
        a: 26.5,
        b: 16.6,
        c: 15.9
      },
      {
        month: "9",
        a: 23.3,
        b: 14.2,
        c: 20.7
      },
      {
        month: "10",
        a: 18.3,
        b: 10.3,
        c: 25.9
      },
      {
        month: "11",
        a: 13.9,
        b: 6.6,
        c: 26
      },
      {
        month: "12",
        a: 9.6,
        b: 4.8,
        c: 30
      }
    ]

    const ds = new DataSet()
    const dv = ds.createView().source(data)
    dv.transform({
      type: "fold",
      fields: ["a", "b", "c"],
      // 展开字段集
      key: "city",
      // key字段
      value: "temperature" // value字段
    })
    const cols = {
      month: {
        range: [0, 1]
      }
    }

    return (
      <div style={{  width: 750, }}>
        <Chart height={250} data={dv} scale={cols} forceFit>
          <Legend />
          <Axis name="month" />
          <Axis
            name="temperature"
            label={{
              formatter: val => `${val}万个`
            }}
          />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="line"
            position="month*temperature"
            size={2}
            color={"city"}
            shape={"smooth"}
          />
          <Geom
            type="point"
            position="month*temperature"
            size={4}
            shape={"circle"}
            color={"city"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
        </Chart>
      </div>
    )
  }
}
