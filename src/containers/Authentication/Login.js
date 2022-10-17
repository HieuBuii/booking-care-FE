import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
    };
  }

  handleInputUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handleInputPassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleLogin = () => {
    console.log(this.state);
  };

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 login-title">LOGIN</div>
            <div className="col-12 form-group login-input">
              <label className="login-label">Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Username"
                onChange={(e) => this.handleInputUsername(e)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label className="login-label">Password:</label>
              <div className="login-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter Your Password"
                  onChange={(e) => this.handleInputPassword(e)}
                />
                <div
                  className="login-password-icon"
                  onClick={() => this.handleShowHidePassword()}
                >
                  <i
                    className={
                      this.state.isShowPassword
                        ? "far fa-eye"
                        : "far fa-eye-slash"
                    }
                  ></i>
                </div>
              </div>
            </div>
            <div className="col-12">
              <button className="btn-login" onClick={() => this.handleLogin()}>
                Login
              </button>
            </div>
            <div className="col-12">
              <a href="#" className="login-forgot">
                Forgot Your Password ?
              </a>
            </div>
            <div className="col-12">
              <div className="login-social">
                <div className="login-other">Or Login With:</div>
                <i className="fab fa-facebook-f facebook"></i>
                <i className="fab fa-google-plus-g google"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
