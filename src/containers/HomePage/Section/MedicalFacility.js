import React, { Component } from "react";
import { connect } from "react-redux";

import Slider from "react-slick";

class MedicalFacility extends Component {
  render() {
    return (
      <div className="section-common section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <h3 className="section-title">Cơ sở y tế nổi bật</h3>
            <button className="section-btn">Tìm kiếm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-custom">
                <div className="section-img medical-facility-img"></div>
                <p>Bệnh viện Chợ Rẫy</p>
              </div>
              <div className="section-custom">
                <div className="section-img medical-facility-img"></div>
                <p>Bệnh viện Chợ Rẫy</p>
              </div>
              <div className="section-custom">
                <div className="section-img medical-facility-img"></div>
                <p>Bệnh viện Chợ Rẫy</p>
              </div>
              <div className="section-custom">
                <div className="section-img medical-facility-img"></div>
                <p>Bệnh viện Chợ Rẫy</p>
              </div>
              <div className="section-custom">
                <div className="section-img medical-facility-img"></div>
                <p>Bệnh viện Chợ Rẫy</p>
              </div>
              <div className="section-custom">
                <div className="section-img medical-facility-img"></div>
                <p>Bệnh viện Chợ Rẫy</p>
              </div>
              <div className="section-custom">
                <div className="section-img medical-facility-img"></div>
                <p>Bệnh viện Chợ Rẫy</p>
              </div>
              <div className="section-custom">
                <div className="section-img medical-facility-img"></div>
                <p>Bệnh viện Chợ Rẫy</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
