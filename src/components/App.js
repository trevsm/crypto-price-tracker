import React, { Component } from "react";
import "@babel/polyfill";

import Contact from "./Contact";
import "../styles/App.scss";

//not paid free api key -- max of 50 calls per second
const API_KEY = "";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: {
        BTC: { USD: 0, changed: 0, indication: 0 },
        ETH: { USD: 0, changed: 0, indication: 0 },
        XRP: { USD: 0, changed: 0, indication: 0 },
        LTC: { USD: 0, changed: 0, indication: 0 },
        EOS: { USD: 0, changed: 0, indication: 0 },
        BCH: { USD: 0, changed: 0, indication: 0 },
        BNB: { USD: 0, changed: 0, indication: 0 },
        XLM: { USD: 0, changed: 0, indication: 0 },
        USDT: { USD: 0, changed: 0, indication: 0 },
        TRX: { USD: 0, changed: 0, indication: 0 },
        ADA: { USD: 0, changed: 0, indication: 0 },
        BSV: { USD: 0, changed: 0, indication: 0 },
        XMR: { USD: 0, changed: 0, indication: 0 },
        DASH: { USD: 0, changed: 0, indication: 0 },
        MKR: { USD: 0, changed: 0, indication: 0 },
        NEO: { USD: 0, changed: 0, indication: 0 },
        ONT: { USD: 0, changed: 0, indication: 0 },
        ETC: { USD: 0, changed: 0, indication: 0 },
        ZEC: { USD: 0, changed: 0, indication: 0 },
        XTZ: { USD: 0, changed: 0, indication: 0 },
        VET: { USD: 0, changed: 0, indication: 0 },
        WAVES: { USD: 0, changed: 0, indication: 0 },
        DOGE: { USD: 0, changed: 0, indication: 0 },
        USDC: { USD: 0, changed: 0, indication: 0 },
        BAT: { USD: 0, changed: 0, indication: 0 },
        BTG: { USD: 0, changed: 0, indication: 0 },
        QTUM: { USD: 0, changed: 0, indication: 0 },
        OMG: { USD: 0, changed: 0, indication: 0 },
        DCR: { USD: 0, changed: 0, indication: 0 },
        LSK: { USD: 0, changed: 0, indication: 0 },
        LINK: { USD: 0, changed: 0, indication: 0 },
        DGB: { USD: 0, changed: 0, indication: 0 },
        REP: { USD: 0, changed: 0, indication: 0 },
        ZIL: { USD: 0, changed: 0, indication: 0 },
        ABBC: { USD: 0, changed: 0, indication: 0 },
        ICX: { USD: 0, changed: 0, indication: 0 },
        ZRX: { USD: 0, changed: 0, indication: 0 },
        HOT: { USD: 0, changed: 0, indication: 0 },
        BCN: { USD: 0, changed: 0, indication: 0 },
        BTT: { USD: 0, changed: 0, indication: 0 },
        STEEM: { USD: 0, changed: 0, indication: 0 },
        NANO: { USD: 0, changed: 0, indication: 0 },
        BTS: { USD: 0, changed: 0, indication: 0 },
        BCD: { USD: 0, changed: 0, indication: 0 },
        ENJ: { USD: 0, changed: 0, indication: 0 },
        THETA: { USD: 0, changed: 0, indication: 0 },
        KMD: { USD: 0, changed: 0, indication: 0 },
        PAX: { USD: 0, changed: 0, indication: 0 },
        AE: { USD: 0, changed: 0, indication: 0 },
        NPXS: { USD: 0, changed: 0, indication: 0 },
        XVG: { USD: 0, changed: 0, indication: 0 },
        SC: { USD: 0, changed: 0, indication: 0 },
        BTM: { USD: 0, changed: 0, indication: 0 },
        HT: { USD: 0, changed: 0, indication: 0 },
        RVN: { USD: 0, changed: 0, indication: 0 },
        DAI: { USD: 0, changed: 0, indication: 0 },
        STRAT: { USD: 0, changed: 0, indication: 0 },
        AOA: { USD: 0, changed: 0, indication: 0 },
        IOST: { USD: 0, changed: 0, indication: 0 },
        SNT: { USD: 0, changed: 0, indication: 0 },
        PPT: { USD: 0, changed: 0, indication: 0 },
        KCS: { USD: 0, changed: 0, indication: 0 },
        GNT: { USD: 0, changed: 0, indication: 0 },
        REPO: { USD: 0, changed: 0, indication: 0 },
        PAI: { USD: 0, changed: 0, indication: 0 },
        ARK: { USD: 0, changed: 0, indication: 0 },
        ARDR: { USD: 0, changed: 0, indication: 0 },
        R: { USD: 0, changed: 0, indication: 0 }
      }
    };

    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.tick();
    window.setInterval(this.tick, 100);
  }

  async tick() {
    console.log("tick");
    const URL = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${Object.keys(
      this.state.listings
    )}&tsyms=USD&api_key=${API_KEY}`;
    const data = await fetch(URL).then(raw => raw.json());

    this.setState(prevState => {
      const listings = {};

      // looping over previous listings
      const keys = Object.keys(prevState.listings);
      for (let i = 0; i < keys.length; i++) {
        // debugger;
        const key = keys[i];
        const previous = prevState.listings[keys[i]];
        const current = data[keys[i]];
        const changed = current.USD - previous.USD;
        const indication = previous.indication;

        if (changed < 0) {
          if (indication == -1) {
            indication = -2;
          } else {
            indication = -1;
          }
        } else if (changed > 0) {
          if (indication == 1) {
            indication = 2;
          } else {
            indication = 1;
          }
        }
        listings[keys[i]] = {
          USD: current.USD,
          changed,
          indication
        };
      }
      return { listings };
    });
  }

  createTable(listings, min, max) {
    const keys = Object.keys(listings);
    let table = [];
    for (let i = min; i < max; i++) {
      let rows = [];

      const key = keys[i];
      const listing = listings[key];
      let changedClass = "";
      switch (listing.indication) {
        case 1:
          changedClass = " up";
          break;
        case 2:
          changedClass = " up2";
          break;
        case -1:
          changedClass = " down";
          break;
        case -2:
          changedClass = " down2";
          break;
        default:
          changedClass = "";
      }
      rows.push(
        <td>
          <div className="symbol">{Object.keys(listings)[i]}</div>
          <div className={`price${changedClass}`}>
            {Object.values(listings)[i]["USD"]}
          </div>
        </td>
      );

      table.push(<tr>{rows}</tr>);
    }
    return table;
  }

  render() {
    const { listings } = this.state;

    return (
      <>
        <section className="overview">
          <table className="listings box-shadow">
            <tbody>{this.createTable(listings, 0, 10)}</tbody>
          </table>
          <table className="listings box-shadow">
            <tbody>{this.createTable(listings, 10, 20)}</tbody>
          </table>
          <table className="listings box-shadow">
            <tbody>{this.createTable(listings, 30, 40)}</tbody>
          </table>
          <table className="listings box-shadow">
            <tbody>{this.createTable(listings, 40, 50)}</tbody>
          </table>
        </section>
        <Contact />
      </>
    );
  }
}

export default App;
