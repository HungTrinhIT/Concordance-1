import React, { Component } from "react";
import "./tag.css";
import { connect } from "react-redux";
class Tag extends Component {
  state = {
    typeTag: "pos",
    typeTagDetail:""
  };

  onChangleHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    let options = null;
    let typeTag =
      this.props.language.charAt(0) +
      this.state.typeTag.charAt(0).toUpperCase() +
      this.state.typeTag.slice(1, this.state.typeTag.length);
    let tagDetail = this.props.tags[`${typeTag}`].map((item) => {
      return item.tag;
    });

    // Select>options
    options = tagDetail.map((item, index) => {
      return (
        <option value={item} key={index}>
          {item}
        </option>
      );
    });

    return (
      <div className="col-3 tag d-flex justify-content-start algin-items-center">
        <div>
          <p className="content__title">Tag</p>
          <div className="tag__choosen d-flex justify-content- algin-items-center">
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
            
          </div>
        </div>
        <div className="tag__content">
          <select
            className="tag__select"
            name="typeTagDetail"
            onChange={this.onChangleHandler}
            value={this.state.typeTagDetail}

          >
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
export default connect(mapStateToProps)(Tag);
