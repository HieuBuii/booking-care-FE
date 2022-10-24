import React, { Component } from "react";
import { connect } from "react-redux";

import Slider from "react-slick";

class Specialty extends Component {
  render() {
    return (
      <div className="section-common section-specialty">
        <div className="section-container container">
          <div className="section-header">
            <h3 className="section-title">Chuyên khoa phổ biến</h3>
            <button className="section-btn">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-custom">
                <div className="section-img specialty-img"></div>
                <p>Cơ xương khớp</p>
              </div>
              <div className="section-custom">
                <div className="section-img specialty-img"></div>
                <p>Cơ xương khớp</p>
              </div>
              <div className="section-custom">
                <div className="section-img specialty-img"></div>
                <p>Cơ xương khớp</p>
              </div>
              <div className="section-custom">
                <div className="section-img specialty-img"></div>
                <p>Cơ xương khớp</p>
              </div>
              <div className="section-custom">
                <div className="section-img specialty-img"></div>
                <p>Cơ xương khớp</p>
              </div>
              <div className="section-custom">
                <div className="section-img specialty-img"></div>
                <p>Cơ xương khớp</p>
              </div>
              <div className="section-custom">
                <div className="section-img specialty-img"></div>
                <p>Cơ xương khớp</p>
              </div>
              <div className="section-custom">
                <div className="section-img specialty-img"></div>
                <p>Cơ xương khớp</p>
              </div>
            </Slider>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
