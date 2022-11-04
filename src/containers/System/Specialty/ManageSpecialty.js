import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSpecialty.scss";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import { CommonUtils } from "../../../utils";
import { LENGUAGES } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { toast } from "react-toastify";
import {
  saveSpecialtyService,
  getAllSpecialties,
  editSpecialtyService,
  deleteSpecialtyService,
} from "../../../services/userService";
import _ from "lodash";

const mdParser = new MarkdownIt(/* Doctor_intro-it options */);

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameSpecialty: "",
      image: "",
      previewImg: "",
      contentHTML: "",
      contentMarkdown: "",
      listSpecialty: [],
      idSpecialty: "",
      statusSubmit: "ADD",
    };
  }

  async componentDidMount() {
    let res = await getAllSpecialties();
    if (res && res.errCode === 0) {
      this.setState({
        listSpecialty: res.data,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {}

  handleAddImg = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImg: objectUrl,
        image: base64,
      });
    }
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };

  handleChangeInput = (e) => {
    let copyState = { ...this.state };
    copyState.nameSpecialty = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.statusSubmit === "ADD") {
      let isValid = this.validInput();
      if (isValid) {
        let res = await saveSpecialtyService({
          image: this.state.image,
          name: this.state.nameSpecialty,
          contentHTML: this.state.contentHTML,
          contentMarkdown: this.state.contentMarkdown,
        });
        if (res && res.errCode === 0) {
          toast.success(
            <FormattedMessage id="manage-specialty.save-succeed" />
          );
          this.setState({
            nameSpecialty: "",
            image: "",
            previewImg: "",
            contentHTML: "",
            contentMarkdown: "",
          });
        } else {
          toast.error(<FormattedMessage id="manage-specialty.save-failed" />);
        }
      } else {
        return;
      }
    }
    if (this.state.statusSubmit === "EDIT") {
      let isValid = this.validInput();
      if (isValid) {
        let res = await editSpecialtyService({
          image: this.state.image,
          name: this.state.nameSpecialty,
          contentHTML: this.state.contentHTML,
          contentMarkdown: this.state.contentMarkdown,
          id: this.state.idSpecialty,
        });
        if (res && res.errCode === 0) {
          toast.success(
            <FormattedMessage id="manage-specialty.save-succeed" />
          );
          this.setState({
            nameSpecialty: "",
            image: "",
            previewImg: "",
            contentHTML: "",
            contentMarkdown: "",
            statusSubmit: "ADD",
          });
        } else {
          toast.error(<FormattedMessage id="manage-specialty.save-failed" />);
        }
      } else {
        return;
      }
    }
    let res = await getAllSpecialties();
    if (res && res.errCode === 0) {
      this.setState({
        listSpecialty: res.data,
      });
    }
  };

  validInput = () => {
    let isValid = true;
    let arr = ["nameSpecialty", "image", "contentHTML", "contentMarkdown"];
    for (let i = 0; i < arr.length; i++) {
      if (!this.state[arr[i]]) {
        isValid = false;
        toast.error(<FormattedMessage id="manage-specialty.fill-all" />);
        break;
      }
    }
    return isValid;
  };

  handleEditSpecialty = (item) => {
    this.setState({
      nameSpecialty: item.name,
      image: item.image,
      previewImg: item.image,
      contentHTML: item.contentHTML,
      contentMarkdown: item.contentMarkdown,
      idSpecialty: item.id,
      statusSubmit: "EDIT",
    });
  };

  handleDeleteSpecialty = async (item) => {
    console.log(item);
    if (item && !_.isEmpty(item)) {
      let res = await deleteSpecialtyService(item.id);
      if (res && res.errCode === 0) {
        toast.success(
          <FormattedMessage id="manage-specialty.delete-succeed" />
        );
      } else {
        toast.error(<FormattedMessage id="manage-specialty.delete-failed" />);
      }
    }
    let res = await getAllSpecialties();
    if (res && res.errCode === 0) {
      this.setState({
        listSpecialty: res.data,
      });
    }
  };

  render() {
    let { listSpecialty } = this.state;
    let file = this.state.previewImg;
    return (
      <>
        <div className="manage-specialty-container">
          <div className="title">
            <FormattedMessage id="manage-specialty.title" />
          </div>
          <div className="manage-body container">
            <form className="row g-3 mt-5">
              <div className="col-md-6">
                <label className="form-label">
                  <FormattedMessage id="manage-specialty.name-specialty" />
                </label>
                <input
                  type="nameSpecialty"
                  className="form-control"
                  onChange={(e) => this.handleChangeInput(e)}
                  value={this.state.nameSpecialty}
                />
              </div>
              <div className="col-md-6 manage-specialty-img">
                <label className="form-label">
                  <FormattedMessage id="manage-specialty.image-specialty" />
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
                    ></div>
                  )}
                </div>
              </div>
              <div className="col-12">
                <MdEditor
                  style={{ height: "400px" }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={this.handleEditorChange}
                  value={
                    this.state.contentMarkdown ? this.state.contentMarkdown : ""
                  }
                />
              </div>
              <div className="col-12">
                <button
                  className="btn btn-primary px-3 btn-submit"
                  onClick={(e) => this.handleSubmit(e)}
                >
                  <th>
                    <FormattedMessage id="manage-specialty.save" />
                  </th>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="users-container container my-5">
          <table id="customers">
            <thead>
              <tr>
                <th>
                  <FormattedMessage id="manage-specialty.order" />
                </th>
                <th>
                  <FormattedMessage id="manage-specialty.name-specialty" />
                </th>
                <th>
                  <FormattedMessage id="manage-specialty.options" />
                </th>
              </tr>
            </thead>

            <tbody>
              {listSpecialty &&
                listSpecialty.length > 0 &&
                listSpecialty.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>
                        <div>
                          <button
                            className="btn btn-edit"
                            onClick={() => this.handleEditSpecialty(item)}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => this.handleDeleteSpecialty(item)}
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
  connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty)
);
