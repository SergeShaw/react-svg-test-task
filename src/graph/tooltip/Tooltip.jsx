import React from 'react';

export default class Tooltip extends React.PureComponent {

  calculate(point) {
    let offset = {
      x: point.x + 3,
      y: point.y - this.props.height - 5,
    };

    if (offset.x + this.props.width > this.props.maxWidth) {
      offset.x = point.x - 3 - 50;
    }

    if (offset.y < 0) {
      offset.y = point.y + 3;
    }

    return offset;
  }

  render() {

    const { point } = this.props;
    const { x, y } = this.calculate(point);

    return (
      <g>
        <defs>
          <filter id="dropshadow">
            <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0.5" />
            <feColorMatrix result="matrixOut" in="offOut" type="matrix"
              values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
            <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="0.75" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>
        </defs>

        <rect
          filter="url(#dropshadow)"
          fill="white"
          rx="1"
          width={this.props.width}
          height={this.props.height}
          x={x}
          y={y}
        />
        <text
          x={x + 3}
          y={y + 3 + 5.5}
          fontSize="5.5"
          fill="gray"
          fillOpacity="0.75"
        >{point.date}</text>
        <text
          x={x + 3}
          y={y + 3 + 5.5 + 3 + 6}
          fontSize="6"
        >$ {point.value.toFixed(2)}</text>
        <text
          x={x + 3 + 22}
          y={y + 3 + 5.5 + 3 + 6}
          fontSize="6"
          fill={point.delta >= 0 ? '#00A357' : 'red'}
        > {point.delta >= 0 ? '▲' : '▼'}{Math.abs(point.delta).toFixed(2)}</text>

        <line
          x1={point.x}
          y1={point.y}
          x2={point.x}
          y2={this.props.maxHeight}
          stroke="gray"
          strokeWidth="0.2"
          strokeDasharray="3 1"
          fillOpacity="0.75"
        />
        <circle
          r="3"
          fill="#f6f7f8"
          cx={point.x}
          cy={point.y}
        />
        <circle
          r="2"
          fill="#67A1C5"
          cx={point.x}
          cy={point.y}
        />
      </g>
    );
  }
}
