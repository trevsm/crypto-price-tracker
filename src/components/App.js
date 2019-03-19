import React, { Component } from "react";
import Contact from "./Contact";
import "../styles/App.scss";
const API_KEY = "";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: {
        BTC: { USD: 0 },
        ETH: { USD: 0 },
        XRP: { USD: 0 },
        LTC: { USD: 0 },
        EOS: { USD: 0 },
        BCH: { USD: 0 },
        BNB: { USD: 0 },
        XLM: { USD: 0 },
        USDT: { USD: 0 },
        TRX: { USD: 0 },
        ADA: { USD: 0 },
        BSV: { USD: 0 },
        XMR: { USD: 0 },
        DASH: { USD: 0 },
        MKR: { USD: 0 },
        NEO: { USD: 0 },
        ONT: { USD: 0 },
        ETC: { USD: 0 },
        ZEC: { USD: 0 },
        XTZ: { USD: 0 },
        VET: { USD: 0 },
        WAVES: { USD: 0 },
        DOGE: { USD: 0 },
        USDC: { USD: 0 },
        BAT: { USD: 0 },
        BTG: { USD: 0 },
        QTUM: { USD: 0 },
        OMG: { USD: 0 },
        TSUD: { USD: 0 },
        DCR: { USD: 0 },
        LSK: { USD: 0 },
        LINK: { USD: 0 },
        DGB: { USD: 0 },
        REP: { USD: 0 },
        ZIL: { USD: 0 },
        ABBC: { USD: 0 },
        ICX: { USD: 0 },
        ZRX: { USD: 0 },
        HOT: { USD: 0 },
        BCN: { USD: 0 },
        BTT: { USD: 0 },
        STEEM: { USD: 0 },
        NANO: { USD: 0 },
        BTS: { USD: 0 },
        BCD: { USD: 0 },
        ENJ: { USD: 0 },
        THETA: { USD: 0 },
        KMD: { USD: 0 },
        PAX: { USD: 0 },
        AE: { USD: 0 },
        NPXS: { USD: 0 },
        XVG: { USD: 0 },
        SC: { USD: 0 },
        BTM: { USD: 0 },
        HT: { USD: 0 },
        RVN: { USD: 0 },
        DAI: { USD: 0 },
        STRAT: { USD: 0 },
        AOA: { USD: 0 },
        IOST: { USD: 0 },
        SNT: { USD: 0 },
        PPT: { USD: 0 },
        KCS: { USD: 0 },
        GNT: { USD: 0 },
        REPO: { USD: 0 },
        PAI: { USD: 0 },
        ARK: { USD: 0 },
        ARDR: { USD: 0 },
        R: { USD: 0 }
      },
      oldListings: {
        BTC: { USD: 0 },
        ETH: { USD: 0 },
        XRP: { USD: 0 },
        LTC: { USD: 0 },
        EOS: { USD: 0 },
        BCH: { USD: 0 },
        BNB: { USD: 0 },
        XLM: { USD: 0 },
        USDT: { USD: 0 },
        TRX: { USD: 0 },
        ADA: { USD: 0 },
        BSV: { USD: 0 },
        XMR: { USD: 0 },
        DASH: { USD: 0 },
        MKR: { USD: 0 },
        NEO: { USD: 0 },
        ONT: { USD: 0 },
        ETC: { USD: 0 },
        ZEC: { USD: 0 },
        XTZ: { USD: 0 },
        VET: { USD: 0 },
        WAVES: { USD: 0 },
        DOGE: { USD: 0 },
        USDC: { USD: 0 },
        BAT: { USD: 0 },
        BTG: { USD: 0 },
        QTUM: { USD: 0 },
        OMG: { USD: 0 },
        TSUD: { USD: 0 },
        DCR: { USD: 0 },
        LSK: { USD: 0 },
        LINK: { USD: 0 },
        DGB: { USD: 0 },
        REP: { USD: 0 },
        ZIL: { USD: 0 },
        ABBC: { USD: 0 },
        ICX: { USD: 0 },
        ZRX: { USD: 0 },
        HOT: { USD: 0 },
        BCN: { USD: 0 },
        BTT: { USD: 0 },
        STEEM: { USD: 0 },
        NANO: { USD: 0 },
        BTS: { USD: 0 },
        BCD: { USD: 0 },
        ENJ: { USD: 0 },
        THETA: { USD: 0 },
        KMD: { USD: 0 },
        PAX: { USD: 0 },
        AE: { USD: 0 },
        NPXS: { USD: 0 },
        XVG: { USD: 0 },
        SC: { USD: 0 },
        BTM: { USD: 0 },
        HT: { USD: 0 },
        RVN: { USD: 0 },
        DAI: { USD: 0 },
        STRAT: { USD: 0 },
        AOA: { USD: 0 },
        IOST: { USD: 0 },
        SNT: { USD: 0 },
        PPT: { USD: 0 },
        KCS: { USD: 0 },
        GNT: { USD: 0 },
        REPO: { USD: 0 },
        PAI: { USD: 0 },
        ARK: { USD: 0 },
        ARDR: { USD: 0 },
        R: { USD: 0 }
      }
    };

    this.tick = this.tick.bind(this);
    this.determineStatus = this.determineStatus.bind(this);
  }
  componentDidMount() {
    this.tick();
    window.setInterval(this.tick, 1000);
  }
  tick() {
    const { listings } = this.state;
    const URL = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${Object.keys(
      listings
    )}&tsyms=USD&api_key=${API_KEY}`;
    console.log("fetch");
    fetch(URL)
      .then(raw => raw.json())
      .then(raw => {
        this.setState({
          listings: raw
        });
      });
    this.setState({
      oldListings: listings
    });
  }

  determineStatus(listings, oldListings, e, index) {
    let updown = "";
    if (e["USD"] > Object.values(oldListings)[index]["USD"]) {
      updown = "up";
    }
    if (e["USD"] < Object.values(oldListings)[index]["USD"]) {
      updown = "down";
    }
    return updown;
  }
  createTable(listings, oldListings, min, max) {
    let table = [];
    for (let i = min; i < max; i++) {
      let rows = [];
      for (let j = 0; j < 1; j++) {
        rows.push(
          <td>
            <div className="symbol">{Object.keys(listings)[i]}</div>
            <div
              className={`price ${this.determineStatus(
                listings,
                oldListings,
                Object.values(listings)[i],
                i
              )}`}
            >
              {Object.values(listings)[i]["USD"]}
            </div>
          </td>
        );
      }
      table.push(<tr>{rows}</tr>);
    }
    return table;
  }
  render() {
    const { listings, oldListings } = this.state;
    return (
      <>
        <section className="overview">
          <table className="listings box-shadow">
            <tbody>{this.createTable(listings, oldListings, 0, 10)}</tbody>
          </table>
          <table className="listings box-shadow">
            <tbody>{this.createTable(listings, oldListings, 10, 20)}</tbody>
          </table>
          <table className="listings box-shadow">
            <tbody>{this.createTable(listings, oldListings, 30, 40)}</tbody>
          </table>
          <table className="listings box-shadow">
            <tbody>{this.createTable(listings, oldListings, 40, 50)}</tbody>
          </table>
        </section>
        <Contact />
      </>
    );
  }
}

export default App;
