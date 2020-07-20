import React, { Component } from "react";
import "./sidebar.css";
import { connect } from "react-redux";
import { createAction } from "../../Redux/Action";
import { SEARCH_TYPE } from "../../Redux/Action/type";

class Sidebar extends Component {
  render() {
    return <div className="col-2 side-bar"></div>;
  }
}

export default connect()(Sidebar);
