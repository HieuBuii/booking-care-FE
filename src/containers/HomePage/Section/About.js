import React, { Component } from "react";
import { connect } from "react-redux";

class About extends Component {
  render() {
    return (
      <div className="section-common">
        <div className="section-container">
          <div className="section-header">
            <h3 className="section-title">
              Mọi người nói gì về <strong>PTIT</strong>
            </h3>
          </div>
          <div className="section-body section-about">
            <div className="about-video">
              <iframe
                width="100%"
                height="400px"
                src="https://www.youtube.com/embed/IFRjie2XVzE"
                title="Giới thiệu Học viện Công nghệ Bưu chính Viễn thông - PTIT"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <div className="about-detail"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
