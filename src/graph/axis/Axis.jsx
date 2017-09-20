import React from 'react';
import { axisMonths } from '../data.js';

export default class Axis extends React.PureComponent {

  render() {
    return (
      <g>
        {Array.apply(null, Array(this.props.count)).map((_, ind) =>
          <g
            key={ind}
          >
            <text
              x="15"
              y={this.props.height - 20 * ind }
              fontSize="6"
              fill="gray"
              textAnchor="end"
            >{20 * ind}</text>
            <line
              strokeWidth="0.2"
              x1={this.props.offsetX}
              x2={this.props.offsetX + this.props.width}
              y1={this.props.height - 20 * ind - 0.3}
              y2={this.props.height - 20 * ind - 0.3}
              stroke="gray"
            />
          </g>
        )}
        
        {axisMonths.map((month, ind) =>
          <text
            key={ind}
            x={this.props.offsetX + ind * 30 + 15}
            y={this.props.height + this.props.offsetY / 3}
            fontSize="6"
            fill="gray"
            textAnchor="middle"
          >{month}</text>
        )}
        <text
          x={this.props.offsetX + 5}
          y={this.props.height + this.props.offsetY - 10}
          fontSize="6"
          fill="gray"
          textAnchor="start"
        >2015</text>
      </g>
    );
  }
}
