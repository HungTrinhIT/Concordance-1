import React, { Component } from "react";
import "./Table.css";
import { connect } from "react-redux";
import { createAction } from "../../Redux/Action";
import { FETCH_DETAIL_SENTENCE } from "../../Redux/Action/type";
import { dataService } from "../../Services";
const dataAlignment = {
  source: [
    [
      "ED",
      "010001",
      "01",
      "Have",
      "have",
      "1",
      "have",
      "VBP",
      "-",
      "-",
      "O",
      "-",
    ],
    ["ED", "010001", "02", "you", "you", "-", "you", "PRP", "-", "-", "O", "-"],
    [
      "ED",
      "010001",
      "03",
      "washed",
      "washed",
      "3",
      "wash",
      "VBN",
      "-",
      "-",
      "O",
      "-",
    ],
    ["ED", "010001", "04", "up", "up", "-", "up", "RP", "-", "-", "O", "-"],
    [
      "ED",
      "010001",
      "05",
      "all",
      "all",
      "4,5",
      "all",
      "PDT",
      "-",
      "-",
      "O",
      "-",
    ],
    ["ED", "010001", "06", "the", "the", "-", "the", "DT", "-", "-", "O", "-"],
    [
      "ED",
      "010001",
      "07",
      "plates",
      "plate",
      "6",
      "plate",
      "NNS",
      "-",
      "-",
      "O",
      "-",
    ],
    ["ED", "010001", "08", "?", "?", "8,9", "?", ".", "-", "-", "O", "-"],
    ["ED", "010001", "08", "?", "?", "8,9", "?", ".", "-", "-", "O", "-"],
    ["ED", "010001", "08", "?", "?", "8,9", "?", ".", "-", "-", "O", "-"],
    ["ED", "010001", "08", "?", "?", "8,9", "?", ".", "-", "-", "O", "-"],
  ],
  target: [
    ["VD", "010001", "01", "Anh", "anh", "1", "anh", "Nn", "-", "-", "O", "-"],
    ["VD", "010001", "02", "đã", "dda4", "0", "dda4", "R", "-", "-", "O", "-"],
    [
      "VD",
      "010001",
      "03",
      "rửa",
      "ruwa3",
      "3",
      "ruwa3",
      "Vv",
      "-",
      "-",
      "O",
      "-",
    ],
    [
      "VD",
      "010001",
      "04",
      "tất_cả",
      "taat1_ca3",
      "5",
      "taat1_ca3",
      "Nq",
      "-",
      "-",
      "O",
      "-",
    ],
    [
      "VD",
      "010001",
      "05",
      "các",
      "cac1",
      "5",
      "cac1",
      "Nq",
      "-",
      "-",
      "O",
      "-",
    ],
    [
      "VD",
      "010001",
      "06",
      "đĩa",
      "ddia4",
      "7",
      "ddia4",
      "Nn",
      "-",
      "-",
      "O",
      "-",
    ],
    ["VD", "010001", "07", "đó", "ddo1", "0", "ddo1", "Pd", "-", "-", "O", "-"],
    [
      "VD",
      "010001",
      "08",
      "chưa",
      "chuwa",
      "8",
      "chuwa",
      "R",
      "-",
      "-",
      "O",
      "-",
    ],
    ["VD", "010001", "09", "?", "?", "8", "-", "PU", "-", "-", "O", "-"],
    ["VD", "010001", "09", "?", "?", "8", "-", "PU", "-", "-", "O", "-"],
    ["VD", "010001", "09", "?", "?", "8", "-", "PU", "-", "-", "O", "-"],
  ],
};
class Table extends Component {
  handleSentenceDetail = (id) => {
    let lang = this.props.language === "english" ? "en" : "vn";
    dataService
      .fetchData_SentenceDetail(id, lang)
      .then((res) => {
        this.props.dispatch(createAction(FETCH_DETAIL_SENTENCE, dataAlignment));
        this.props.openModalHandler();
      })
      .catch((err) => {
        alert(err.message);
      });
    
  };
  render() {
    let tableContent = this.props.data.map((item) => {
      let activeClass =
        this.props.selectedID === item.sentence_id ? "text-info" : null;
      return (
        <tr
          key={item.sentence_id}
          onClick={() => {
            this.props.handleRowSelected(item.sentence_id);
          }}
          className={activeClass}
          onDoubleClick={() => this.handleSentenceDetail(item.sentence_id)}
        >
          <td className="text-right col-5">
            {item.left.length < 50 ? item.left : item.left.slice(0, 50) + "..."}
          </td>
          <td className="text-center text-primary col-2">
            {item.key.length < 10 ? item.key : item.key.slice(0, 10) + "..."}
          </td>
          <td className="text-left col-5">
            {item.right.length < 50
              ? item.right
              : item.right.slice(0, 50) + "..."}
          </td>
        </tr>
      );
    });
    return (
      <div className="source-languege">
        {/* Title language */}
        <p className="language-title">
          <i className="fa fa-language mr-2" />
          {this.props.languageTitle}
        </p>
        {/* Table content */}
        <div className="table-content">
          <table className="table table-fixed">
            <thead className="text-center">
              <tr>
                <th className="col-5">Left</th>
                <th className="col-2">Key</th>
                <th className="col-5">Right</th>
              </tr>
            </thead>
            <tbody>{tableContent}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.Controller.language,
  };
};
export default connect(mapStateToProps)(Table);
