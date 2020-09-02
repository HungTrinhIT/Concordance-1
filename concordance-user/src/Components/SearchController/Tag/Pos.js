import React, { Component } from "react";
import { connect } from "react-redux";
class Pos extends Component {
  state = {
    typeTag: "",
    typeTagDetail: "",
  };
  onChangleHandler = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        this.props.handleTag({
          key: this.state.typeTag,
          value: this.state.typeTagDetail,
        });
      }
    );
  };
  static getDerivedStateFromProps(props, state) {
    if (props.isRefresh) {
      return {
        typeTag: "",
        typeTagDetail: "",
      };
    }
    return false;
  }
  render() {
    let options = null;
    let typeTag =
      this.props.language.charAt(0) +
      this.state.typeTag.charAt(0).toUpperCase() +
      this.state.typeTag.slice(1, this.state.typeTag.length);
    let tagDetail = null;
    if (this.state.typeTag !== "") {
      tagDetail = this.props.tags[`${typeTag}`].map((item) => {
        return item.tag;
      });
    }
    // Select>options
    if (tagDetail !== null) {
      options = tagDetail.map((item, index) => {
        return (
          <option value={item} key={index}>
            {item}
          </option>
        );
      });
    }
    return (
      <div className="tag__choosen">
        <div className="form-check mb-4">
          <label className="form-check-label">
            <input
              type="checkbox"
              className="form-check-input"
              name="typeTag"
              value="pos"
              onChange={this.onChangleHandler}
              checked={this.state.typeTag === "pos"}
            />
            POS
          </label>
        </div>
        <div className="tag__content">
          <select
            className="tag__select"
            name="typeTagDetail"
            onChange={this.onChangleHandler}
            value={this.state.typeTagDetail}
          >
            <option defaultValue="Choose your option">Choose pos</option>
            {options}
          </select>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.Controller.language,
    tags: state.Tag.tags,
  };
};

export default connect(mapStateToProps)(Pos);
