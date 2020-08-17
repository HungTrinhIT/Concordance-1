import React, { Component } from "react";
import "./statistics.css";
import { connect } from "react-redux";
import StatisTable from "./StatisTable";
import StatisController from "./StatisController";
import axios from "axios";
import { createAction } from "../../Redux/Action";
import {
  FETCH_STATISTIC_DATA,
  FETCH_SUMARY_DATA,
} from "../../Redux/Action/type";
const data = [
  [".", 9, ".", "O", "-"],
  ["£", 7, "NN", "O", "-"],
  ["a", 6, "DT", "O", "-"],
  ["'", 6, "POS", "O", "-"],
  ['"', 4, "-", "-", "-"],
  ["'", 4, "''", "O", "-"],
  ["is", 3, "VBZ", "O", "-"],
  ["for", 3, "IN", "O", "-"],
  ["means", 2, "NNS", "O", "-"],
  ["the", 2, "DT", "-", "-"],
  ["the", 2, "DT", "O", "-"],
  ["It", 2, "PRP", "-", "-"],
  ["It", 2, "PRP", "O", "-"],
  ["very", 2, "RB", "O", "-"],
  [",", 2, ",", "O", "-"],
  ["person", 1, "NN", "O", "-"],
  ["petrol", 1, "NN", "O", "-"],
  ["Renmin", 1, "NNP", "O", "-"],
  ["people", 1, "NNS", "O", "-"],
  ["poor", 1, "JJ", "O", "-"],
  ["pension", 1, "NN", "O", "-"],
  ["painting", 1, "NN", "O", "-"],
  ["our", 1, "PRP$", "O", "-"],
  ["or", 1, "CC", "O", "-"],
  ["of", 1, "IN", "O", "-"],
  ["now", 1, "RB", "O", "-"],
  ["my", 1, "PRP$", "O", "-"],
  ["month", 1, "NN", "O", "-"],
  ["money", 1, "NN", "O", "-"],
  ["Theater", 1, "NNP", "O", "-"],
  ["!", 1, ".", "-", "-"],
  ["your", 1, "PRP$", "O", "-"],
  ["you", 1, "PRP", "O", "-"],
  ["worth", 1, "JJ", "O", "-"],
  ["will", 1, "MD", "O", "-"],
  ["us", 1, "PRP", "O", "-"],
  ["towards", 1, "IN", "O", "-"],
  ["to", 1, "TO", "O", "-"],
  ["price", 1, "NN", "-", "-"],
  ["Thank", 1, "VB", "O", "-"],
  ["showing", 1, "VBG", "O", "-"],
  ["shares", 1, "NNS", "O", "-"],
  ["says", 1, "VBZ", "O", "-"],
  ["salary", 1, "NN", "O", "-"],
  ["respectable", 1, "JJ", "O", "-"],
  ["keeps", 1, "VBZ", "-", "-"],
  ["privilege", 1, "NN", "O", "-"],
  ["'", 1, "''", "-", "-"],
  ["cheap", 1, "JJ", "-", "-"],
  ["book", 1, "NN", "O", "-"],
  ["bi", 1, "FW", "O", "-"],
  ["be", 1, "VB", "-", "-"],
  ["at", 1, "IN", "O", "-"],
  ["at", 1, "IN", "-", "-"],
  ["are", 1, "VBP", "O", "-"],
  ["and", 1, "CC", "O", "-"],
  ["cheap", 1, "JJ", "O", "-"],
  ["30", 1, "CD", "O", "-"],
  ["3", 1, "CD", "O", "-"],
  ["20.000", 1, "CD", "O", "-"],
  ["20", 1, "CD", "O", "-"],
  ["2.75", 1, "CD", "O", "-"],
  ["2", 1, "CD", "O", "-"],
  ["10", 1, "CD", "O", "-"],
  ["'s", 1, "VBZ", "O", "-"],
  ["happy", 1, "JJ", "-", "-"],
  ["lot", 1, "NN", "O", "-"],
  ["Line", 1, "NNP", "O", "-"],
  ["'ll", 1, "MD", "-", "-"],
  ["journey", 1, "NN", "O", "-"],
  ["if", 1, "IN", "-", "-"],
  ["here", 1, "RB", "O", "-"],
  ["Hartford", 1, "NNP", "LOCATION", "-"],
  ["hardback", 1, "NN", "O", "-"],
  ["means", 1, "VBZ", "O", "-"],
  ["goes", 1, "VBZ", "O", "-"],
  ["fund", 1, "NN", "O", "-"],
  ["family", 1, "NN", "-", "-"],
  ["currency", 1, "NN", "O", "-"],
  ["cover", 1, "VB", "O", "-"],
  ["collection", 1, "NN", "O", "-"],
  ["Chorus", 1, "NNP", "O", "-"],
];
class Statistics extends Component {
  state = {
    num: "all", // 1. all , 2. number of top
    lang: "en",
    count: 0,
    typeTag: "",
    typeTagDetail: "", // 1. No,  2. POS,  3. NER
  };
  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/api/statistic/?lang=${this.state.lang}`)
      .then((res) => {
        this.props.dispatch(createAction(FETCH_STATISTIC_DATA, res.data));
      })
      .catch((err) => {
        alert(err.message);
      });

    axios
      .get("http://127.0.0.1:8000/api/totalstatistics")
      .then((res) => {
        this.props.dispatch(createAction(FETCH_SUMARY_DATA, res.data));
      })
      .catch((err) => {
        alert(err.message);
      });
  }
  handleController = (num, lang, count, typeTag, typeTagDetail) => {
    this.setState({
      num: num,
      lang: lang,
      count: count,
      typeTag: typeTag,
      typeTagDetail: typeTagDetail,
    });
  };
  unique() {
    let cache;
    return (elem, index, array) => {
      if (!cache) cache = new Set(array);
      return cache.delete(elem);
    };
  }

  handleData = () => {
    // let totalCount = 5232342;// Tổng số tokens
    let totalCount=0;
    let sumData = this.props.sumaryData;// Data tổng ban đầu thống kê
    if (sumData.length !== 0) {
      if (this.state.lang === "en") {
        totalCount = sumData[0][1];
      } else totalCount = sumData[1][1];
    }

    let statisData = this.props.data;// data theo language để thống kê
    let temp = [];
    let uniqueArray = [];
    for (let i = 0; i < data.length; i++) {
      temp.push(data[i][0]);
    }
    
    uniqueArray = temp.filter(this.unique()); // Lọc những word không trùng
    let result = [];
    for (let i = 0; i < uniqueArray.length; i++) {
      let obj = {};
      obj.word = uniqueArray[i];
      let countArray = data.filter((item) => item[0] === uniqueArray[i]); // mảng chứa những word giống nhau
      let count = 0;
      for (let i = 0; i < countArray.length; i++) {
        count += countArray[i][1];
      }
      obj.count = count;
      let percent = (count / totalCount) * 100;
      obj.percent = percent.toFixed(2);
      let f = Math.log10(totalCount / count);
      obj.f = f.toFixed(2);
      result.push(obj);
    }
    return result;
  };
  render() {
    let dataStatistic = this.handleData();

    return (
      <div className="statistics-section container">
        {/* Sumary */}
        {this.props.sumaryData.length !== 0 ? (
          <div className="row">
            <div className="col-6">
              <p>English</p>
              <div>
                <ul>
                  <li>Total word types: {this.props.sumaryData[0][3]}</li>
                  <li>Total word token: {this.props.sumaryData[0][1]}</li>
                  <li>Total sentences: {this.props.sumaryData[0][2]}</li>
                </ul>
              </div>
            </div>
            <div className="col-6">
              <p>Vietnamses</p>
              <div>
                <ul>
                  <li>Total word types: {this.props.sumaryData[1][3]}</li>
                  <li>Total word token: {this.props.sumaryData[2][1]}</li>
                  <li>Total sentences: {this.props.sumaryData[1][2]}</li>
                </ul>
              </div>
            </div>
          </div>
        ) : null}

        <div className="row">
          {/* Table */}
          <div className="col-9">
            <StatisTable dataStatistic={dataStatistic} a="hello" />
          </div>

          {/* Controller */}
          <div className="col-3">
            <StatisController controller={this.handleController} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.Controller.language,
    sumaryData: state.Data.sumaryStatistic,
    data: state.Data.statisData,
  };
};

export default connect(mapStateToProps)(Statistics);
