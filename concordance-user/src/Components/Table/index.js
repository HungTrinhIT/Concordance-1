import React, { Component } from "react";
import "./Table.css";
import { connect } from "react-redux";
import { createAction } from "../../Redux/Action";
import { FETCH_DETAIL_SENTENCE } from "../../Redux/Action/type";
import { dataService } from "../../Services";

class Table extends Component {
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
