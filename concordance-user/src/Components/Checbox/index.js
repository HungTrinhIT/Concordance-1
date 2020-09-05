import React, { Component } from "react";

export default class Checkbox extends Component {
  static propTypes = {
    checked: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
  };
  static defaultProps = {
    checked: false,
    disabled: false,
  };

  state = {
    check: this.props.checked,
  };

  render() {
    return (
      <div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value={}
            name={}
            
          />
          <label className="form-check-label">
            Default checkbox
          </label>
        </div>
      </div>
    );
  }
}
