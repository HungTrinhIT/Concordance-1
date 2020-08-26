import React, { Component } from "react";
import "./table.css";

export default class Table extends Component {
  state = {
    thead: [
      "lang",
      "sentence_id",
      "word_id",
      "word",
      "lemma",
      "links",
      "morph",
      "pos",
      "phrase",
      "grm",
      "ner",
      "semantic",
    ],
  };
  renderTHead = () => {
    let listTHead;
    listTHead = this.state.thead.map((item, index) => {
      return (
        <th key={index} className="col-1">
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </th>
      );
    });
    return listTHead;
  };
  renderTBody = () => {
    return this.props.data.map((item, index) => {
      delete item.id;
      let objs = Object.values(item);
      return (
        <tr key={index}>
          {objs.map((itemTD, index) => {
            return (
              <td key={index} className="col-1">
                {itemTD}
              </td>
            );
          })}
        </tr>
      );
    });
  };
  render() {
    return (
      <div>
        <table className="table table-fixed">
          <thead>
            <tr>{this.renderTHead()}</tr>
          </thead>
          <tbody>{this.renderTBody()}</tbody>
        </table>
      </div>
    );
  }
}
