import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailClinic.scss";
import { withRouter } from "react-router";
import HomeHeader from "../../HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorMore from "../Doctor/DoctorMore";
import DoctorInfo from "../Doctor/DoctorInfo";
import Footer from "../../Section/Footer";
import { getClinicById } from "../../../../services/userService";
import _ from "lodash";
import LoadingOverlay from "react-loading-overlay";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctorId: [],
      dataDetailClinic: [],
      isShowMore: false,
      isLoading: false,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getClinicById(id);

      if (res && res.errCode === 0) {
        let data = res.data[0];
        let listDoctorId = [];
        if (data && !_.isEmpty(data)) {
          let arrDoctor = data.doctorClinicData;
          if (arrDoctor && arrDoctor.length > 0) {
            arrDoctor.map((item) => {
              return listDoctorId.push(item.doctorId);
            });
          }
          this.setState({
            listDoctorId: listDoctorId ? listDoctorId : [],
            dataDetailClinic: data,
          });
        }
      }
    }
  }

  componentDidUpdate() {}

  handleShowContent = () => {
    this.setState({
      isShowMore: !this.state.isShowMore,
    });
  };

  handleShowLoading = (boolean) => {
    this.setState({
      isLoading: boolean,
    });
  };

  render() {
    const { listDoctorId, dataDetailClinic, isShowMore } = this.state;
    let dataContent = dataDetailClinic.contentHTML;
    return (
      <>
        <LoadingOverlay active={this.state.isLoading} spinner text="Loading...">
          <div className="detail-specialty-container">
            <HomeHeader />
            {isShowMore === false ? (
              <div
                className="detail-specialty-content container"
                style={{ height: "500px", overflow: "hidden" }}
              >
                <h2 className="clinic-name">{dataDetailClinic.name}</h2>
                <div dangerouslySetInnerHTML={{ __html: dataContent }} />
                <div
                  className="view-more"
                  onClick={() => this.handleShowContent()}
                >
                  Xem thêm
                </div>
              </div>
            ) : (
              <div className="detail-specialty-content container">
                <h2 className="clinic-name">{dataDetailClinic.name}</h2>
                <div dangerouslySetInnerHTML={{ __html: dataContent }} />
                <div
                  className="view-more"
                  onClick={() => this.handleShowContent()}
                >
                  Ẩn bớt
                </div>
              </div>
            )}

            <div className="detail-specialty-body">
              {listDoctorId &&
                listDoctorId.length > 0 &&
                listDoctorId.map((item, index) => {
                  return (
                    <div className="about-doctor container" key={index}>
                      <div className="about-detail-doctor">
                        <DoctorInfo
                          idDoctor={item}
                          isShowDesc={true}
                          isShowPrice={false}
                          isShowMore={true}
                        />
                      </div>
                      <div className="about-schedule-doctor">
                        <div className="schedule-doctor">
                          <DoctorSchedule
                            idDoctor={item}
                            handleShowLoadingFromParent={this.handleShowLoading}
                          />
                        </div>
                        <div className="more-info-doctor">
                          <DoctorMore idDoctor={item} />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <Footer />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailClinic)
);
