import React, { Component } from "react";
import { connect } from "react-redux";
import "./StatisController.css";
class StatisController extends Component {
  state = {
    num: "all", // 1. all , 2. number of top
    lang: "en",
    count: 0,
    typeTag: "",
    typeTagDetail: "", // 1. No,  2. POS,  3. NER
  };

  onChangleHandler = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        this.props.controller(
          this.state.num,
          this.state.lang,
          this.state.count,
          this.state.typeTag,
          this.state.typeTagDetail
        );
      }
    );
  };
  render() {
    let options = null;
    let typeTag =
      this.state.lang.charAt(0) +
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
      <div>
        {/* Language */}
        <div className="controller-wrapper">
          <p className="controller__item">Language</p>
          <div className="form-check mr-3">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                name="lang"
                value="en"
                onChange={this.onChangleHandler}
                checked={this.state.lang === "en"}
              />
              English
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                name="lang"
                value="vn"
                onChange={this.onChangleHandler}
                checked={this.state.lang === "vn"}
              />
              Vietnamese
            </label>
          </div>
        </div>

        {/* Numbers */}
        <div className="controller-wrapper">
          <p className="controller__item">Numbers</p>
          <div className="form-check mr-3">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                name="num"
                value="all"
                onChange={this.onChangleHandler}
                checked={this.state.num === "all"}
              />
              All words
            </label>
          </div>
          <div className="form-check mr-3">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                name="num"
                value="top"
                onChange={this.onChangleHandler}
                checked={this.state.num === "top"}
              />
              Top
            </label>
          </div>
        </div>

        {/* Tag */}
        <div className="controller-wrapper">
          <p className="controller__item">Tag</p>
          <div className="form-check mr-3">
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
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                name="typeTag"
                value="ner"
                onChange={this.onChangleHandler}
                checked={this.state.typeTag === "ner"}
              />
              NER
            </label>
          </div>
          <div className="tag__content ml-3">
            <select
              className="tag__select"
              name="typeTagDetail"
              onChange={this.onChangleHandler}
              value={this.state.typeTagDetail}
            >
              <option defaultValue="Choose your option">
                Choose your option
              </option>
              {options}
            </select>
          </div>
        </div>
        {/* Button */}
        <div className="button-statis">
          <button type="submit" className="btn-search  mr-3">
            FILTER
          </button>
          <button
            type="button"
            className="btn-refresh"
            onClick={this.handleRefresh}
          >
            REFRESH
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tags: state.Tag.tags,
  };
};

export default connect(mapStateToProps)(StatisController);
