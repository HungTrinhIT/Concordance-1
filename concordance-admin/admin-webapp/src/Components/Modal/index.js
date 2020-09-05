import React, { Component } from "react";
import "./modal.css";
import Axios from "axios";
class Modal extends Component {
  state = {
    data: {
      id: "",
      lang: "",
      sentence_id: "",
      word_id: "",
      word: "",
      lemma: "",
      links: "",
      morpho: "",
      pos: "",
      phrase: "",
      grm: "",
      ner: "",
      semantic: "",
    },
  };
  static getDerivedStateFromProps = (props, state) => {
    if (props.editData !== state.data) {
      return {
        data: props.editData,
      };
    }
    return null;
  };
  onChangeHandler = (e) => {
    const { data } = { ...this.state };
    const currentData = data;
    const { name, value } = e.target;
    currentData[name] = value;
    this.setState({
      data: currentData,
    });
  };

  //Day data edit len server
  onSubmitHandler = (e) => {
    e.preventDefault();
    Axios.put("http://127.0.0.1:8000/api/edit/", {
      body: this.state.data,
    })
      .then((res) => {
        alert("Update thanh cong!!");
        this.props.openModalHandler();
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  render() {
    let entries = Object.entries(this.state.data);
    let modalContent = [];
    for (const [key, value] of entries) {
      let disabled = false;
      if (key === "id" || key === "lang" || key === "sentence_id")
        disabled = true;
      let label = key.charAt(0).toUpperCase() + key.slice(1);
      modalContent.push(
        <div className="col-6">
          <div className="form-group">
            <label className="font-weight-bold">{label}</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter email"
              name={key}
              value={this.state.data[`${key}`]}
              onChange={this.onChangeHandler}
              disabled={disabled}
            />
          </div>
        </div>
      );
    }
    return (
      <div
        className="Modal"
        style={{
          transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: this.props.show ? 1 : 0,
        }}
      >
        <div className="modal-top pb-2 mb-4 border-bottom d-flex justify-content-between align-items-center">
          <h4 className="mb-0 font-weight-bold">EDIT FORM</h4>
          <i
            className="fa fa-times icon-close"
            onClick={this.props.openModalHandler}
          ></i>
        </div>
        <form onSubmit={this.onSubmitHandler}>
          <div className="row ">{modalContent}</div>
          <div className="border-top btn-wrp-edit">
            <button type="submit" class="btn btn-info mt-2 btn-edit-summit">
              SAVE CHAGES
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Modal;
