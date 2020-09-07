import React, { Component } from "react";
import "./TableHome.css";
import { dataService } from "../../../Services";
import { createAction } from "../../../Redux/Action";
import { FETCH_DETAIL_SENTENCE } from "../../../Redux/Action/type";
import { connect } from "react-redux";
// const data = {
//   source: [
//     [1, "ED", "000001", "01", '"', '"', "1", "'", "''", "-", "-", "-", "-"],
//     [2, "ED", "000001", "02", "It", "it", "-", "it", "PRP", "-", "-", "-", "-"],
//     [3, "ED", "000001", "03", "'ll", "'ll", "-", "-", "MD", "-", "-", "-", "-"],
//     [4, "ED", "000001", "04", "be", "be", "-", "be", "VB", "-", "-", "-", "-"],
//     [
//       5,
//       "ED",
//       "000001",
//       "05",
//       "cheap",
//       "cheap",
//       "13",
//       "cheap",
//       "JJ",
//       "-",
//       "-",
//       "-",
//       "-",
//     ],
//     [6, "ED", "000001", "06", "at", "at", "-", "at", "IN", "-", "-", "-", "-"],
//     [
//       7,
//       "ED",
//       "000001",
//       "07",
//       "the",
//       "the",
//       "-",
//       "the",
//       "DT",
//       "-",
//       "-",
//       "-",
//       "-",
//     ],
//     [
//       8,
//       "ED",
//       "000001",
//       "08",
//       "price",
//       "price",
//       "12",
//       "price",
//       "NN",
//       "-",
//       "-",
//       "-",
//       "-",
//     ],
//     [9, "ED", "000001", "09", "if", "if", "2", "if", "IN", "-", "-", "-", "-"],
//     [
//       10,
//       "ED",
//       "000001",
//       "10",
//       "it",
//       "it",
//       "3",
//       "it",
//       "PRP",
//       "-",
//       "-",
//       "-",
//       "-",
//     ],
//     [
//       11,
//       "ED",
//       "000001",
//       "11",
//       "keeps",
//       "keep",
//       "5,10,11",
//       "keep",
//       "VBZ",
//       "-",
//       "-",
//       "-",
//       "-",
//     ],
//     [
//       12,
//       "ED",
//       "000001",
//       "12",
//       "the",
//       "the",
//       "-",
//       "the",
//       "DT",
//       "-",
//       "-",
//       "-",
//       "-",
//     ],
//     [
//       13,
//       "ED",
//       "000001",
//       "13",
//       "family",
//       "family",
//       "8",
//       "family",
//       "NN",
//       "-",
//       "-",
//       "-",
//       "-",
//     ],
//     [
//       14,
//       "ED",
//       "000001",
//       "14",
//       "happy",
//       "happy",
//       "7",
//       "happy",
//       "JJ",
//       "-",
//       "-",
//       "-",
//       "-",
//     ],
//     [15, "ED", "000001", "15", "!", "!", "14", "!", ".", "-", "-", "-", "-"],
//   ],
//   target: [
//     [1, "VD", "000001", "01", "'", "'", "1", "-", "PU", "-", "-", "O", "-"],
//     [
//       2,
//       "VD",
//       "000001",
//       "02",
//       "Nếu",
//       "neeu1",
//       "9",
//       "neeu1",
//       "Cs",
//       "-",
//       "-",
//       "O",
//       "-",
//     ],
//     [
//       3,
//       "VD",
//       "000001",
//       "03",
//       "điều",
//       "ddieeu2",
//       "10",
//       "ddieeu2",
//       "Nc",
//       "-",
//       "-",
//       "O",
//       "-",
//     ],
//     [
//       4,
//       "VD",
//       "000001",
//       "04",
//       "đó",
//       "ddo1",
//       "0",
//       "ddo1",
//       "Pd",
//       "-",
//       "-",
//       "O",
//       "-",
//     ],
//     [
//       5,
//       "VD",
//       "000001",
//       "05",
//       "giữ",
//       "giuw4",
//       "11",
//       "giuw4",
//       "Vv",
//       "-",
//       "-",
//       "O",
//       "-",
//     ],
//     [
//       6,
//       "VD",
//       "000001",
//       "06",
//       "được",
//       "dduwowc5",
//       "0",
//       "dduwowc5",
//       "R",
//       "-",
//       "-",
//       "O",
//       "-",
//     ],
//     [
//       7,
//       "VD",
//       "000001",
//       "07",
//       "hạnh_phúc",
//       "hanh5_phuc1",
//       "14",
//       "hanh5_phuc1",
//       "Nn",
//       "-",
//       "-",
//       "O",
//       "-",
//     ],
//     [
//       8,
//       "VD",
//       "000001",
//       "08",
//       "gia_đình",
//       "gia_ddinh2",
//       "13",
//       "gia_ddinh2",
//       "Nn",
//       "-",
//       "-",
//       "O",
//       "-",
//     ],
//     [
//       9,
//       "VD",
//       "000001",
//       "09",
//       "thì",
//       "thi2",
//       "0",
//       "thi2",
//       "Cp",
//       "-",
//       "-",
//       "O",
//       "-",
//     ],
//     [
//       10,
//       "VD",
//       "000001",
//       "10",
//       "vẫn",
//       "vaan4",
//       "11",
//       "vaan4",
//       "R",
//       "-",
//       "-",
//       "O",
//       "-",
//     ],
//     [
//       11,
//       "VD",
//       "000001",
//       "11",
//       "còn",
//       "con2",
//       "11",
//       "con2",
//       "R",
//       "-",
//       "-",
//       "O",
//       "-",
//     ],
//     [
//       12,
//       "VD",
//       "000001",
//       "12",
//       "hời",
//       "howi2",
//       "8",
//       "howi2",
//       "Aa",
//       "-",
//       "-",
//       "O",
//       "-",
//     ],
//     [
//       13,
//       "VD",
//       "000001",
//       "13",
//       "đấy",
//       "ddaay1",
//       "5",
//       "ddaay1",
//       "M",
//       "-",
//       "-",
//       "O",
//       "-",
//     ],
//     [14, "VD", "000001", "14", "!", "!", "15", "-", "PU", "-", "-", "O", "-"],
//   ],
// };

class TableHome extends Component {
  handleSentenceDetail = (id) => {
    let lang = this.props.language === "english" ? "en" : "vn";
    // this.props.dispatch(createAction(FETCH_DETAIL_SENTENCE, data));
    // this.props.openModalHandler();

    //Fetch data alignment
    dataService
      .fetchData_SentenceDetail(id, lang)
      .then((res) => {
        this.props.dispatch(createAction(FETCH_DETAIL_SENTENCE, res.data));
        this.props.openModalHandler();
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  render() {
    let { data } = this.props;
    let tbodyContent = data.map((item, index) => {
      let activeClass =
        this.props.selectedID === item.sentence_id ? "text-info" : null;
      return (
        <tr
          key={index}
          onClick={() => {
            this.props.handleRowSelected(item.sentence_id);
          }}
          onDoubleClick={() => this.handleSentenceDetail(item.sentence_id)}
          className={activeClass}
        >
          <td className="col-3">{item.sentence_id}</td>
          <td className="col-9">{item.sentence}</td>
        </tr>
      );
    });
    return (
      <div className="table__home">
        <div className="table-content">
          <table className="table table-fixedcd">
            <thead>
              <tr>
                <th className="col-3">ID</th>
                <th className="col-9">Sentence</th>
              </tr>
            </thead>
            <tbody>{tbodyContent}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect()(TableHome);
