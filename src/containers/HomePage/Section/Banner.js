import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class Banner extends Component {
  render() {
    return (
      <>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
