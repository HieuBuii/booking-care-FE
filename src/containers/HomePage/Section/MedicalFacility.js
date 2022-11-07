import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllClinic } from "../../../services/userService";
import { withRouter } from "react-router";

import Slider from "react-slick";

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listClinic: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {}

  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        listClinic: res.data,
      });
    }
  }

  handleViewDetail = (clinic) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${clinic.id}`);
    }
  };

  render() {
    let { listClinic } = this.state;
    return (
      <div className="section-common section-medical-facility">
        <div className="section-container container">
          <div className="section-header">
            <h3 className="section-title">Cơ sở y tế nổi bật</h3>
            <button className="section-btn">Tìm kiếm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {listClinic &&
                listClinic.length > 0 &&
                listClinic.map((item, index) => {
                  return (
                    <div
                      className="section-custom"
                      key={index}
                      onClick={() => this.handleViewDetail(item)}
                    >
                      <div
                        className="section-img medical-facility-img"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <p>{item.name}</p>
                    </div>
                  );
                })}
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
