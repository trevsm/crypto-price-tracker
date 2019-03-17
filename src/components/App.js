import React, { Component } from "react";
import axios from "axios";
import "../styles/App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: []
    };
    this.tick = this.tick.bind(this);
  }
  componentDidMount() {
    window.setInterval(this.tick, 1000);
    console.log("loading");
  }
  tick() {
    console.log("tick");
    axios
      .get(
        "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD"
      )
      .then(res => {
        const raw = res.data;
        this.setState({
          listings: raw
        });
      });
  }
  render() {
    const { listings } = this.state;
    return (
      <>
        {Object.keys(listings).map(key => (
          <div className="coin" key={key}>
            <div>{key}</div>
            <div>{listings[key].USD} USD</div>
          </div>
        ))}
      </>
    );
  }
}

export default App;
