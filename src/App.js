import React, { Component } from 'react';

import Graph from './graph/Graph.jsx';
import { points } from './graph/data';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Graph
          points={points}
          width={1095}
          height={300}
        />
      </div>
    );
  }
}

export default App;
