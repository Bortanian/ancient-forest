import React, { Component } from 'react';
import './App.css';
import route from './route'

class App extends Component {
  render() {
    return (
      <div className="App">
        {route}
      </div>
    );
  }
}

export default App;
