import React, { Component } from "react";
import { connect } from "react-redux";
import "./StatisController.css";
import { dataService } from "../../../Services";
import { createAction } from "../../../Redux/Action";
import { FETCH_STATIS_QUERY } from "../../../Redux/Action/type";

class StatisController extends Component {
  state = {
    num: "top", // 1. all , 2. top
    lang: "en", // Language for statistic
    count: 100, // count if top words is top
    typeTag: "", // Ner or Pos
    typeTagDetail: "", // Detail Ner or Pos
  };
  onChangleHandler = (e) => {
    if (e.target.name === "lang") {
      this.props.setLang(e.target.value);
    }
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  refreshHandler = () => {
    this.setState({
      num: "all",
      lang: "en",
      count: 100,
      typeTag: "",
      typeTagDetail: "",
    });
  };
  onSubmitHandler = (e) => {
    let { num, lang, count, typeTag, typeTagDetail } = this.state;
    e.preventDefault();
    // When submit event is trigged, client will be call API to server
    dataService
      .fetchData_QueryStatistic(num, lang, count, typeTag, typeTagDetail)
      .then((response) => {
        this.props.dispatch(createAction(FETCH_STATIS_QUERY, response.data));
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  render() {
    let options = null;
    // Get typeTag : pos, ner
    let typeTag =
      this.state.lang.charAt(0) +
      this.state.typeTag.charAt(0).toUpperCase() +
      this.state.typeTag.slice(1, this.state.typeTag.length);
    let tagDetail = null;
    // Get typeTagDetail
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
      <form onSubmit={this.onSubmitHandler}>
        {/* Language */}
        <div className="controller-wrapper">
          <p className="controller__item">Language</p>
          <div className="d-flex controller__item-ctn">
            <div className="form-check mr-3">
              <label className="form-check-label">
                <input
                  type="radio"
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
                  type="radio"
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
        </div>
        {/* Numbers */}
        <div className="controller-wrapper">
          <p className="controller__item">Numbers</p>
          <div className="controller__item-ctn">
            <div className="form-check mr-3 mb-2">
              <label className="form-check-label">
                <input
                  type="radio"
                  className="form-check-input"
                  name="num"
                  value="all"
                  onChange={this.onChangleHandler}
                  checked={this.state.num === "all"}
                />
                All words
              </label>
            </div>
            <div className="form-check mr-3 d-flex algin-items-center">
              <label className="form-check-label mr-4">
                <input
                  type="radio"
                  className="form-check-input"
                  name="num"
                  value="top"
                  onChange={this.onChangleHandler}
                  checked={this.state.num === "top"}
                />
                Top
              </label>
              <input
                type="number"
                name="count"
                value={this.state.count}
                onChange={this.onChangleHandler}
                disabled={this.state.num === "top" ? false : true}
              />
            </div>
          </div>
        </div>
        {/* Tag */}
        <div className="controller-wrapper mb-4">
          <p className="controller__item">Tag</p>
          <div className="controller__item-ctn d-flex">
            <div className="mr-4">
              <div className="form-check mb-2">
                <label className="form-check-label">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="typeTag"
                    value=""
                    onChange={this.onChangleHandler}
                    checked={this.state.typeTag === ""}
                  />
                  No tag
                </label>
              </div>
              <div className="form-check mb-2">
                <label className="form-check-label">
                  <input
                    type="radio"
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
                    type="radio"
                    className="form-check-input"
                    name="typeTag"
                    value="ner"
                    onChange={this.onChangleHandler}
                    checked={this.state.typeTag === "ner"}
                  />
                  NER
                </label>
              </div>
            </div>
            <div className="tag__content">
              <select
                className="tag__select"
                name="typeTagDetail"
                onChange={this.onChangleHandler}
                value={this.state.typeTagDetail}
                disabled={this.state.typeTag !== "" ? false : true}
              >
                <option defaultValue="Choose your option">
                  Choose your option
                </option>
                {options}
              </select>
            </div>
          </div>
        </div>
        {/* Button */}
        <div className="button-statis ">
          <button type="submit" className="btn-search  mr-3">
            FILTER
          </button>
          <button
            type="button"
            className="btn-refresh"
            onClick={this.refreshHandler}
          >
            REFRESH
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tags: state.Tag.tags,
  };
};

export default connect(mapStateToProps)(StatisController);
