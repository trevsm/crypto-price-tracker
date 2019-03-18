import React, { Component } from "react";
import axios from "axios";
import "../styles/App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: {
        BTC: { USD: 0 },
        ETH: { USD: 0 },
        LTC: { USD: 0 },
        XRP: { USD: 0 },
        XLM: { USD: 0 }
      }
    };

    this.tick = this.tick.bind(this);
  }
  componentDidMount() {
    this.tick();
    window.setInterval(this.tick, 1000);
  }
  tick() {
    const { listings } = this.state;
    const URL = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${Object.keys(
      listings
    )}&tsyms=USD`;

    fetch(URL)
      .then(raw => raw.json())
      .then(raw => {
        this.setState({
          listings: raw
        });
      });
  }
  render() {
    const { listings } = this.state;
    return (
      <>
        <div key={Math.random()}>
          {Object.keys(listings).map(e => (
            <div key={Math.random()}>{e}</div>
          ))}
          {Object.values(listings).map(e =>
            Object.values(e).map(price => (
              <div key={Math.random()} style={{ color: "blue" }}>
                {price}
              </div>
            ))
          )}
        </div>
      </>
    );
  }
}

export default App;
