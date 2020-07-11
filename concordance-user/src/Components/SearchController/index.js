import React, { Component, Fragment } from "react";
import Tag from "./Tag";
import Word from "./Word";
import "./SearchController.css";
import { connect } from "react-redux";
class SearchController extends Component {
  renderController = () => {
    let result = [];
    switch (this.props.languageType) {
      case "word":
        result.push(<Word />);
        break;
      case "tag":
        result.push(<Tag />);
        break;
      case "wordtag":
        result.push(<Tag />);
        result.push(<Word />);
        break;
      default:
        return result;
    }
    return result;
  };
  render() {
    return (
      <Fragment>
        {this.renderController()}

        <div className="col-2">
          <button className="btn-search" type="submit">
            Search
          </button>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    languageType: state.SearchType.type,
  };
};

export default connect(mapStateToProps)(SearchController);
