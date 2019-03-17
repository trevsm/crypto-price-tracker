import React, { Component } from "react";

import "../styles/App.scss";

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log("Mounted Successfully");
  }
  render() {
    return (
      <div>
        <h1>React!</h1>
      </div>
    );
  }
}

export default App;
