import React, { Component } from "react";
import { connect } from "react-redux";
import "./AddRecordModal.css";
class AddRecordModal extends Component {
  render() {
    return (
      <div
        className="modal fade"
        id="addRecordModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="exampleModalLabel">
                Add record
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              Something in here...
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn modalButton_submit">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(AddRecordModal);
