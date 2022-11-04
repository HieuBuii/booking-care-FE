import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LENGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import Select from "react-select";
import DatePicker from "../../../components/Input/DatePicker";
import "./ManageSchedule.scss";
import { toast } from "react-toastify";
import _ from "lodash";
import {
  saveScheduleService,
  getScheduleDoctorService,
  deleteScheduleDoctorService,
} from "../../../services/userService";
import moment from "moment";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: {},
      currentDate: "",
      listDoctors: [],
      rangeTime: [],
      dataTime: [],
      // maxPatient: "1",
    };
  }

  async componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchAllTime();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.allDoctor !== this.props.allDoctor ||
      prevProps.language !== this.props.language
    ) {
      let options = this.buildDataForSelect(this.props.allDoctor);
      this.setState({
        listDoctors: options,
      });
    }
    if (prevProps.timeArr !== this.props.timeArr) {
      let data = this.props.timeArr;
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        rangeTime: data,
      });
    }
  }

  buildDataForSelect = (inputData) => {
    let listOptions = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let obj = {};
        let label =
          this.props.language === LENGUAGES.VI
            ? `${item.lastName} ${item.firstName}`
            : `${item.firstName} ${item.lastName}`;
        let value = item.id;
        obj.value = value;
        obj.label = label;
        listOptions.push(obj);
      });
    }
    return listOptions;
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption });
  };

  handleOnchangeDatePicker = async (date) => {
    this.setState({
      currentDate: date[0],
    });
    let { selectedDoctor, currentDate } = this.state;
    if (selectedDoctor && currentDate) {
      let res = await getScheduleDoctorService(
        selectedDoctor.value,
        currentDate.getTime()
      );
      if (res && res.errCode === 0) {
        this.setState({
          timeData: res.data,
        });
      }
    }
  };

  handleSelectSchedule = (time) => {
    let rangeTime = this.state.rangeTime;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
    }
    this.setState({
      rangeTime,
    });
  };

  handleSubmit = async () => {
    let { rangeTime, selectedDoctor, currentDate } = this.state;
    let result = [];

    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Select Doctor !!");
      return;
    }

    if (!currentDate) {
      toast.error("Select Date !!");
      return;
    }

    let formatDate = new Date(currentDate).getTime();

    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((item) => {
          let obj = {};
          obj.doctorId = selectedDoctor.value;
          obj.date = formatDate;
          obj.timeType = item.keyMap;
          result.push(obj);
        });
      } else {
        toast.error("Select Time !!");
        return;
      }
    }
    let res = await saveScheduleService({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      formatDate: formatDate,
    });
    if (res && res.errCode === 0) {
      toast.success("Save Schedule Success !!");
      let { selectedDoctor, currentDate } = this.state;
      if (selectedDoctor && currentDate) {
        let res = await getScheduleDoctorService(
          selectedDoctor.value,
          currentDate.getTime()
        );
        if (res && res.errCode === 0) {
          this.setState({
            timeData: res.data,
          });
        }
      }
    } else {
      toast.error("Save Schedule Failed!!");
    }
  };

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  handleDeleteSchedule = async (item) => {
    let res = await deleteScheduleDoctorService(item.id);
    if (res && res.errCode === 0) {
      toast.success("xoa ok");
    } else {
      toast.error("xoa failed");
    }
    let { selectedDoctor, currentDate } = this.state;
    if (selectedDoctor && currentDate) {
      let res = await getScheduleDoctorService(
        selectedDoctor.value,
        currentDate.getTime()
      );
      if (res && res.errCode === 0) {
        this.setState({
          timeData: res.data,
        });
      }
    }
  };

  render() {
    let { rangeTime, timeData } = this.state;
    let { language } = this.props;
    return (
      <div className="manage-schedule-container">
        <div className="title mb-4">
          <FormattedMessage id="menu.doctor.manage-schedule" />
        </div>
        <div className="container">
          <div className="row content-top">
            <div className="col-6 form-group content-top-left">
              <label>
                <FormattedMessage id="menu.doctor.choose-doctor" />
              </label>
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleChangeSelect}
                options={this.state.listDoctors}
              />
            </div>
            <div className="col-6 form-group content-top-right">
              <label>
                <FormattedMessage id="menu.doctor.choose-date" />
              </label>
              <DatePicker
                className="form-control"
                onChange={this.handleOnchangeDatePicker}
                value={this.state.currentDate}
                minDate={new Date().setHours(0, 0, 0, 0)}
              />
            </div>
          </div>
        </div>
        <div className="content-bottom">
          <div className="container">
            <div className="row">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <div key={index} className="col-3 time-schedule">
                      <button
                        onClick={() => this.handleSelectSchedule(item)}
                        className={
                          item.isSelected === true
                            ? "btn-time selected"
                            : "btn-time"
                        }
                      >
                        {language === LENGUAGES.VI
                          ? item.valueVi
                          : item.valueEn}
                      </button>
                    </div>
                  );
                })}
            </div>
            <button
              className="btn-primary btn-save"
              onClick={() => this.handleSubmit()}
            >
              <FormattedMessage id="menu.doctor.save-schedule" />
            </button>
          </div>
        </div>
        <div className="users-container container my-5">
          <table id="customers">
            <thead>
              <tr>
                <th>
                  <FormattedMessage id="menu.doctor.date" />
                </th>
                <th>
                  <FormattedMessage id="menu.doctor.time" />
                </th>
                <th>
                  <FormattedMessage id="manage-specialty.options" />
                </th>
              </tr>
            </thead>

            <tbody>
              {timeData &&
                timeData.length > 0 &&
                timeData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {this.props.language === LENGUAGES.VI
                          ? this.capitalizeFirstLetter(
                              moment
                                .unix(+item.date / 1000)
                                .format("dddd - DD/MM/YYYY")
                            )
                          : moment
                              .unix(+item.date / 1000)
                              .locale("en")
                              .format("ddd - MM/DD/YYYY")}
                      </td>
                      <td>
                        {this.props.language === LENGUAGES.VI
                          ? item.timeTypeData.valueVi
                          : item.timeTypeData.valueEn}
                      </td>
                      <td>
                        <div>
                          <button
                            className="btn btn-delete"
                            onClick={() => this.handleDeleteSchedule(item)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    allDoctor: state.admin.allDoctors,
    timeArr: state.admin.timeArr,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllTime: () => dispatch(actions.fetchAllTime()),
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
