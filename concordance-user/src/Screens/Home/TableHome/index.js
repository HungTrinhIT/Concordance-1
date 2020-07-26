import React, { Component } from "react";
import "./TableHome.css";
import { dataService } from "../../../Services";
import { createAction } from "../../../Redux/Action";
import { FETCH_DETAIL_SENTENCE } from "../../../Redux/Action/type";
import { connect } from "react-redux";
// const dataAlignment = {
//   source: [
//     [
//       "ED",
//       "010001",
//       "01",
//       "Have",
//       "have",
//       "1",
//       "have",
//       "VBP",
//       "-",
//       "-",
//       "O",
//       "-",
//     ],
//     ["ED", "010001", "02", "you", "you", "-", "you", "PRP", "-", "-", "O", "-"],
//     [
//       "ED",
//       "010001",
//       "03",
//       "washed",
//       "washed",
//       "3",
//       "wash",
//       "VBN",
//       "-",
//       "-",
//       "O",
//       "-",
//     ],
//     ["ED", "010001", "04", "up", "up", "-", "up", "RP", "-", "-", "O", "-"],
//     [
//       "ED",
//       "010001",
//       "05",
//       "all",
//       "all",
//       "4,5",
//       "all",
//       "PDT",
//       "-",
//       "-",
//       "O",
//       "-",
//     ],
//     ["ED", "010001", "06", "the", "the", "-", "the", "DT", "-", "-", "O", "-"],
//     [
//       "ED",
//       "010001",
//       "07",
//       "plates",
//       "plate",
//       "6",
//       "plate",
//       "NNS",
//       "-",
//       "-",
//       "O",
//       "-",
//     ],
//     ["ED", "010001", "08", "?", "?", "8,9", "?", ".", "-", "-", "O", "-"],
//     ["ED", "010001", "08", "?", "?", "8,9", "?", ".", "-", "-", "O", "-"],
//     ["ED", "010001", "08", "?", "?", "8,9", "?", ".", "-", "-", "O", "-"],
//     ["ED", "010001", "08", "?", "?", "8,9", "?", ".", "-", "-", "O", "-"],
//   ],
//   target: [
//     ["VD", "010001", "01", "Anh", "anh", "1", "anh", "Nn", "-", "-", "O", "-"],
//     ["VD", "010001", "02", "đã", "dda4", "0", "dda4", "R", "-", "-", "O", "-"],
//     [
//       "VD",
//       "010001",
//       "03",
//       "rửa",
//       "ruwa3",
//       "3",
//       "ruwa3",
//       "Vv",
//       "-",
//       "-",
//       "O",
//       "-",
//     ],
//     [
//       "VD",
//       "010001",
//       "04",
//       "tất_cả",
//       "taat1_ca3",
//       "5",
//       "taat1_ca3",
//       "Nq",
//       "-",
//       "-",
//       "O",
//       "-",
//     ],
//     [
//       "VD",
//       "010001",
//       "05",
//       "các",
//       "cac1",
//       "5",
//       "cac1",
//       "Nq",
//       "-",
//       "-",
//       "O",
//       "-",
//     ],
//     [
//       "VD",
//       "010001",
//       "06",
//       "đĩa",
//       "ddia4",
//       "7",
//       "ddia4",
//       "Nn",
//       "-",
//       "-",
//       "O",
//       "-",
//     ],
//     ["VD", "010001", "07", "đó", "ddo1", "0", "ddo1", "Pd", "-", "-", "O", "-"],
//     [
//       "VD",
//       "010001",
//       "08",
//       "chưa",
//       "chuwa",
//       "8",
//       "chuwa",
//       "R",
//       "-",
//       "-",
//       "O",
//       "-",
//     ],
//     ["VD", "010001", "09", "?", "?", "8", "-", "PU", "-", "-", "O", "-"],
//     ["VD", "010001", "09", "?", "?", "8", "-", "PU", "-", "-", "O", "-"],
//     ["VD", "010001", "09", "?", "?", "8", "-", "PU", "-", "-", "O", "-"],
//   ],
// };

class TableHome extends Component {
  handleSentenceDetail = (id) => {
    let lang = this.props.language === "english" ? "en" : "vn";
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
