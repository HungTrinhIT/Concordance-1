import React, { Component } from "react";
import "./login.css";
import axios from "axios";
import { connect } from "react-redux";
import { createAciton } from "../../Redux/Action";
import { FETCH_CREDENTIALS } from "../../Redux/Action/type";
import { Redirect } from "react-router-dom";
class Login extends Component {
  state = {
    username: "",
    password: "",
    loginError: "",
  };

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    let { username, password } = this.state;
    const { history } = this.props;
    // this.props.dispatch(
    //   createAciton(FETCH_CREDENTIALS, {
    //     username: "Hung",
    //     token: "qeq14ewewqe",
    //   })
    // );
    // localStorage.setItem(
    //   "credentials",
    //   JSON.stringify({ username: "Hung", token: "qeq14ewewqe" })
    // );

    axios
      .post("http://127.0.0.1:8000/api/user/loginAdmin/", {
        body: {
          username: username,
          password: password,
        },
      })
      .then((res) => {
        // Login success
        this.props.dispatch(createAciton(FETCH_CREDENTIALS, res.data));
        localStorage.setItem("credentials", JSON.stringify(res.data));
        history.push("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  render() {
    if (this.props.user) {
      return <Redirect to="/" />;
    }
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100 d-flex align-items-center">
            {/* Image login left */}
            <div className="login100-pic  mr-3" data-tilt>
              <img
                src="images/cropped-Logo-v2.0.22.png"
                alt="IMG"
                width={800}
              />
            </div>

            {/* Form login */}
            <form className="login100-form " onSubmit={this.onSubmitHandler}>
              <span className="login100-form-title ">Member Login</span>

              {/*User name  */}
              <div className="wrap-input100">
                <input
                  className="input100"
                  type="text"
                  name="username"
                  placeholder="Username"
                  required
                  onChange={this.onChangeHandler}
                />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <i className="fa fa-envelope" aria-hidden="true" />
                </span>
              </div>

              {/* Password */}
              <div className="wrap-input100">
                <input
                  className="input100"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  onChange={this.onChangeHandler}
                />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true" />
                </span>
              </div>
              <div className="container-login100-form-btn">
                <button className="login100-form-btn" type="submit">
                  Login
                </button>
              </div>
            </form>
            {/* End form login */}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProp = (state) => {
  return {
    user: state.user.credentials,
  };
};
export default connect(mapStateToProp)(Login);
