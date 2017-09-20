import React, { Component } from 'react';
import Tooltip from './tooltip/Tooltip';
import Axis from './axis/Axis';
import './Graph.css';

import { tooltipMonths } from './data.js';

export default class Graph extends Component {

  constructor(props) {
    super(props);

    this.scaleX = 2;
    this.scaleY = 2;
    this.graphX = 365;
    this.graphY = 100;
    this.offsetX = 20;
    this.offsetY = 30;
    this.width = this.graphX + this.offsetX + 5;
    this.height = this.graphY + this.offsetY;
    
    this.state = {
      loading: true,
      hovered: false,
      x: 0,
      y: 0,
    }

    this.handleHover = this.handleHover.bind(this);
  }

  componentDidMount() {
    this.points = this.prepareData();
    this.pointsStr = this.combinePoints();
    this.rescaleY();

    this.setState({
      loading: false,
    });
  }

  dayOfYear(now) {
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day;
  }

  formatDate(date) {
    return `${date.getDate()} ${tooltipMonths[date.getMonth()]} ${date.getFullYear()}`;
  }

  prepareData() {
    const points = this.props.points.map(({ value, date }, ind) => ({
      value,
      date: this.formatDate(new Date(date)),
      x: this.dayOfYear(new Date(date)) + this.offsetX,
      y: this.graphY - value,
      delta: !ind ? 0 : value - this.props.points[ind-1].value,
    }))
    return points.map((point, ind) => ({
      ...point,
      from: !ind ?
        0 :
        point.x - (point.x - points[ind-1].x) / 2,
      to: ind === points.length - 1 ?
        this.graphX + this.offsetX :
        point.x + (points[ind+1].x - point.x) / 2,
    }));
  }

  combinePoints() {
    return this.points.map(({ x, y }) => `${x} ${y}`).join(', ');
  }

  rescaleY() {
    let maxValue = 0;

    this.points.map(({ value }) =>
      maxValue = value >= maxValue ? value : maxValue
    );

    this.scaleY = 1.25 + (maxValue * (this.height / this.graphY)) / (this.height - this.offsetY);
  }

  handleHover(e) {
    const position = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };

    for (let ii = 0; ii < this.points.length; ++ii) {
      if (position.x / this.scaleX >= this.points[ii].from &&
        position.x / this.scaleX <= this.points[ii].to) {
        return this.setState({
          hovered: true,
          point: this.points[ii],
        });
      }
    }

    this.setState({
      hovered: false,
    });
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    return (
      <svg
        preserveAspectRatio="xMidYMax meet"
        viewBox={`0 0 ${this.width} ${this.height}`}
        width={this.width * this.scaleX}
        height={this.height * this.scaleY}
        className="chart"
        ref="elem"
        onMouseMove={this.handleHover}
      >
        <Axis
          count={10}
          height={this.graphY}
          width={this.graphX}
          offsetX={this.offsetX}
          offsetY={this.offsetY}
        />
        <polyline
          fill="none"
          stroke="#67A1C5"
          strokeWidth="0.75"
          points={this.pointsStr}
        />

        {this.state.hovered &&
          <Tooltip
            fill="gold"
            width={50}
            height={22}
            maxWidth={this.graphX}
            maxHeight={this.graphY}
            x={this.state.x}
            y={this.state.y}
            point={this.state.point}
          />
        }
      </svg>
    );
  }
}
