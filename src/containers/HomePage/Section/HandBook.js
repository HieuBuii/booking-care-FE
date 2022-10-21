import React, { Component } from "react";
import { connect } from "react-redux";

import Slider from "react-slick";

class HandBook extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
    };
    return (
      <div className="section-common section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <h3 className="section-title">Cẩm nang</h3>
            <button className="section-btn">Tất cả bài viết</button>
          </div>
          <div className="section-body">
            <Slider {...settings}>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
