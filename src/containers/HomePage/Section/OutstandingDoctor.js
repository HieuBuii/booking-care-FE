import React, { Component } from "react";
import { connect } from "react-redux";

import Slider from "react-slick";

class MedicalFacility extends Component {
  render() {
    return (
      <div className="section-common section-outstanding-doctor">
        <div className="section-container container">
          <div className="section-header">
            <h3 className="section-title">Bác sĩ nổi bật tuần qua</h3>
            <button className="section-btn">Tìm kiếm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-custom text-center">
                <div className="custom-img">
                  <div className="section-img doctor-img"></div>
                  <p>Giáo sư, tiến sĩ Bùi Trung Hiếu</p>
                  <p>Tai Mũi Họng</p>
                </div>
              </div>
              <div className="section-custom text-center">
                <div className="custom-img">
                  <div className="section-img doctor-img"></div>
                  <p>Giáo sư, tiến sĩ Bùi Trung Hiếu</p>
                  <p>Tai Mũi Họng</p>
                </div>
              </div>
              <div className="section-custom text-center">
                <div className="custom-img">
                  <div className="section-img doctor-img"></div>
                  <p>Giáo sư, tiến sĩ Bùi Trung Hiếu</p>
                  <p>Tai Mũi Họng</p>
                </div>
              </div>
              <div className="section-custom text-center">
                <div className="custom-img">
                  <div className="section-img doctor-img"></div>
                  <p>Giáo sư, tiến sĩ Bùi Trung Hiếu</p>
                  <p>Tai Mũi Họng</p>
                </div>
              </div>
              <div className="section-custom text-center">
                <div className="custom-img">
                  <div className="section-img doctor-img"></div>
                  <p>Giáo sư, tiến sĩ Bùi Trung Hiếu</p>
                  <p>Tai Mũi Họng</p>
                </div>
              </div>
              <div className="section-custom text-center">
                <div className="custom-img">
                  <div className="section-img doctor-img"></div>
                  <p>Giáo sư, tiến sĩ Bùi Trung Hiếu</p>
                  <p>Tai Mũi Họng</p>
                </div>
              </div>
              <div className="section-custom text-center">
                <div className="custom-img">
                  <div className="section-img doctor-img"></div>
                  <p>Giáo sư, tiến sĩ Bùi Trung Hiếu</p>
                  <p>Tai Mũi Họng</p>
                </div>
              </div>
              <div className="section-custom text-center">
                <div className="custom-img">
                  <div className="section-img doctor-img"></div>
                  <p>Giáo sư, tiến sĩ Bùi Trung Hiếu</p>
                  <p>Tai Mũi Họng</p>
                </div>
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
