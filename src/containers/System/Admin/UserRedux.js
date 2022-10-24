import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LENGUAGES, MANAGER_ACTIONS } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManagerUser from "./TableManagerUser";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImg: "",
      isOpen: false,
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phonenumber: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
      action: "",
    };
  }

  componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.gender !== this.props.gender) {
      let arrGender = this.props.gender;
      this.setState({
        genderArr: this.props.gender,
        gender: arrGender && arrGender.length > 0 ? arrGender[0].key : "",
      });
    }

    if (prevProps.position !== this.props.position) {
      let arrPosition = this.props.position;
      this.setState({
        positionArr: this.props.position,
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].key : "",
      });
    }

    if (prevProps.role !== this.props.role) {
      let arrRole = this.props.role;
      this.setState({
        roleArr: this.props.role,
        role: arrRole && arrRole.length > 0 ? arrRole[0].key : "",
      });
    }

    if (prevProps.listUsers !== this.props.listUsers) {
      let arrGender = this.props.gender;
      let arrPosition = this.props.position;
      let arrRole = this.props.role;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phonenumber: "",
        gender: arrGender && arrGender.length > 0 ? arrGender[0].key : "",
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].key : "",
        role: arrRole && arrRole.length > 0 ? arrRole[0].key : "",
        avatar: "",
        actions: MANAGER_ACTIONS.CREATE,
      });
    }
  }

  handleAddImg = (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImg: objectUrl,
        avatar: file,
      });
    }
  };

  showLightbox = () => {
    if (!this.state.previewImg) return;
    this.setState({
      isOpen: true,
    });
  };

  handleChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  validatePassword = (password) => {
    return String(password).match(
      /^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*[\d|@#$!%*?&])[\p{L}\d@#$!%*?&]{6,36}$/gu
    );
  };

  validatePhone = (number) => {
    return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
  };

  validInput = () => {
    let isValid = true;
    if (!this.validateEmail(this.state.email)) {
      isValid = false;
      alert("please fill email address!!");
      return;
    } else if (!this.validatePassword(this.state.password)) {
      isValid = false;
      alert(
        "Password must be atleast: 6 Character, 1 UpperCase, 1 LowerCase and 1 Number !!"
      );
      return;
    } else if (!this.validatePhone(this.state.phonenumber)) {
      isValid = false;
      alert("Please fill exactly your phone number !!");
      return;
    } else {
      let arr = ["firstName", "lastName", "address"];
      for (let i = 0; i < arr.length; i++) {
        if (!this.state[arr[i]]) {
          isValid = false;
          alert(`Missing ${arr[i]}`);
          break;
        }
      }
    }
    return isValid;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let isValid = this.validInput();
    if (isValid) {
      if (this.state.action === MANAGER_ACTIONS.EDIT) {
        this.props.editUser({
          id: this.state.id,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          address: this.state.address,
          phonenumber: this.state.phonenumber,
          gender: this.state.gender,
          roleId: this.state.role,
          positionId: this.state.position,
        });
        this.setState({
          action: MANAGER_ACTIONS.CREATE,
        });
      }
      if (this.state.action === MANAGER_ACTIONS.CREATE) {
        this.props.createUser({
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          address: this.state.address,
          phonenumber: this.state.phonenumber,
          gender: this.state.gender,
          roleId: this.state.role,
          positionId: this.state.position,
          image: this.state.avatar,
        });
      }
    } else {
      return;
    }
  };

  editToParent = (user) => {
    this.setState({
      id: user.id,
      email: user.email,
      password: "Pass1234",
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phonenumber: user.phonenumber,
      gender: user.gender,
      position: user.positionId,
      role: user.roleId,
      avatar: user.avatar,
      action: MANAGER_ACTIONS.EDIT,
    });
  };

  render() {
    let { genderArr, positionArr, roleArr } = this.state;
    let language = this.props.language;
    let file = this.state.previewImg;
    let {
      email,
      password,
      firstName,
      lastName,
      address,
      phonenumber,
      gender,
      position,
      role,
      avatar,
      action,
    } = this.state;
    return (
      <div className="manage-container">
        <div className="title">
          <FormattedMessage id="manage-user.add" />
        </div>
        <div className="manage-body container">
          <form className="row g-3 mt-5">
            <div className="col-md-6">
              <label className="form-label">
                <FormattedMessage id="manage-user.email" />
              </label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => this.handleChangeInput(e, "email")}
                value={email}
                disabled={action === MANAGER_ACTIONS.EDIT ? true : false}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                <FormattedMessage id="manage-user.password" />
              </label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => this.handleChangeInput(e, "password")}
                value={password}
                disabled={action === MANAGER_ACTIONS.EDIT ? true : false}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                <FormattedMessage id="manage-user.first-name" />
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => this.handleChangeInput(e, "firstName")}
                value={firstName}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                <FormattedMessage id="manage-user.last-name" />
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => this.handleChangeInput(e, "lastName")}
                value={lastName}
              />
            </div>
            <div className="col-8">
              <label className="form-label">
                <FormattedMessage id="manage-user.address" />
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => this.handleChangeInput(e, "address")}
                value={address}
              />
            </div>
            <div className="col-4">
              <label className="form-label">
                <FormattedMessage id="manage-user.phonenumber" />
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => this.handleChangeInput(e, "phonenumber")}
                value={phonenumber}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">
                <FormattedMessage id="manage-user.gender" />
              </label>
              <select
                className="form-select"
                onChange={(e) => this.handleChangeInput(e, "gender")}
                value={gender}
              >
                {genderArr &&
                  genderArr.length > 0 &&
                  genderArr.map((item, index) => {
                    return (
                      <option key={index} value={item.key}>
                        {language === LENGUAGES.VI
                          ? item.valueVi
                          : item.valueEn}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">
                <FormattedMessage id="manage-user.position" />
              </label>
              <select
                className="form-select"
                onChange={(e) => this.handleChangeInput(e, "position")}
                value={position}
              >
                {positionArr &&
                  positionArr.length > 0 &&
                  positionArr.map((item, index) => {
                    return (
                      <option key={index} value={item.key}>
                        {language === LENGUAGES.VI
                          ? item.valueVi
                          : item.valueEn}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">
                <FormattedMessage id="manage-user.role" />
              </label>
              <select
                className="form-select"
                onChange={(e) => this.handleChangeInput(e, "role")}
                value={role}
              >
                {roleArr &&
                  roleArr.length > 0 &&
                  roleArr.map((item, index) => {
                    return (
                      <option key={index} value={item.key}>
                        {language === LENGUAGES.VI
                          ? item.valueVi
                          : item.valueEn}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">
                <FormattedMessage id="manage-user.image" />
              </label>
              <div className="input-img-container">
                <input
                  type="file"
                  id="input-img"
                  hidden
                  onChange={(e) => this.handleAddImg(e)}
                />
                <label htmlFor="input-img" className="img-label">
                  <FormattedMessage id="manage-user.upload" />{" "}
                  <i className="fas fa-upload"></i>
                </label>
                {this.state.previewImg && (
                  <div
                    className="img-preview"
                    style={{ backgroundImage: `url(${file})` }}
                    title="View Full"
                    onClick={() => this.showLightbox()}
                  ></div>
                )}
              </div>
            </div>
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary px-3 btn-submit"
                onClick={(e) => this.handleSubmit(e)}
              >
                {action === MANAGER_ACTIONS.EDIT ? (
                  <FormattedMessage id="manage-user.edit" />
                ) : (
                  <FormattedMessage id="manage-user.save" />
                )}
              </button>
            </div>
          </form>
        </div>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={file}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
        <TableManagerUser editToParent={this.editToParent} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    gender: state.admin.genders,
    position: state.admin.positions,
    role: state.admin.roles,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createUser: (data) => dispatch(actions.createUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    editUser: (data) => dispatch(actions.editUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
