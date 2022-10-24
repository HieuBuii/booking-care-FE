import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LENGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions";
import mainLogo from "../../assets/images/Logo.png";

class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    let language = this.props.language;
    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content container">
            <div className="content-left">
              <i className="fas fa-bars icon"></i>
              <div className="header-logo">
                <a href="#">
                  <img src={mainLogo} alt="logo"></img>
                </a>
              </div>
            </div>
            <ul className="content-center">
              <li className="content-child">
                <div className="child-title">
                  <FormattedMessage id="homeheader.specialist" />
                </div>
                <div className="child-subtitle">
                  <FormattedMessage id="homeheader.find-doctor" />
                </div>
              </li>
              <li className="content-child">
                <div className="child-title">
                  <FormattedMessage id="homeheader.health-facilities" />
                </div>
                <div className="child-subtitle">
                  <FormattedMessage id="homeheader.select-clinic" />
                </div>
              </li>
              <li className="content-child">
                <div className="child-title">
                  {" "}
                  <FormattedMessage id="homeheader.doctor" />
                </div>
                <div className="child-subtitle">
                  {" "}
                  <FormattedMessage id="homeheader.choose-doctor" />
                </div>
              </li>
              <li className="content-child">
                <div className="child-title">
                  <FormattedMessage id="homeheader.fee" />
                </div>
                <div className="child-subtitle">
                  <FormattedMessage id="homeheader.check-health" />
                </div>
              </li>
            </ul>
            <div className="content-right">
              <div className="content-support">
                <i className="fas fa-question question"></i>
                <span className="content-question">
                  <FormattedMessage id="homeheader.support" />
                </span>
              </div>
              <div className="content-lang">
                <span
                  className={
                    language === LENGUAGES.VI
                      ? "content-lang-vi isActive"
                      : "content-lang-vi"
                  }
                  onClick={() => this.changeLanguage(LENGUAGES.VI)}
                >
                  VI
                </span>
                <span>/</span>
                <span
                  className={
                    language === LENGUAGES.EN
                      ? "content-lang-en isActive"
                      : "content-lang-en"
                  }
                  onClick={() => this.changeLanguage(LENGUAGES.EN)}
                >
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="home-header-banner">
          <div className="banner-up">
            <h1 className="banner-title">
              <FormattedMessage id="banner.base" />
            </h1>
            <h1 className="banner-title banner-main-title">
              <FormattedMessage id="banner.health-care" />
            </h1>
            <div className="banner-search">
              <i className="fas fa-search"></i>
              <input
                className="banner-input"
                type="text"
                placeholder="Tìm chuyên khoa"
              />
            </div>
          </div>
          <div className="banner-down">
            <ul className="banner-down-options">
              <li className="banner-options">
                <i className="fas fa-hospital-alt"></i>
                <div className="options-title">
                  <FormattedMessage id="banner.specialist" />
                </div>
              </li>
              <li className="banner-options">
                <i className="fas fa-notes-medical"></i>
                <div className="options-title">
                  <FormattedMessage id="banner.check-health" />
                </div>
              </li>
              <li className="banner-options">
                <i className="fas fa-map-marker-alt"></i>
                <div className="options-title">
                  <FormattedMessage id="banner.clinic" />
                </div>
              </li>
              <li className="banner-options">
                <i className="fas fa-user-md"></i>
                <div className="options-title">
                  <FormattedMessage id="banner.doctor" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (languages) =>
      dispatch(changeLanguageApp(languages)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
