import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LENGUAGES } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import "./ManageDoctor.scss";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHTML: "",
      contentMarkdown: "",
      doctorDesc: "",
      selectedOption: null,
      listDoctors: [],
      infoDoctor: {},
      editInfo: false,
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
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
    if (prevProps.infoDoctor !== this.props.infoDoctor) {
      this.setState({
        infoDoctor: this.props.infoDoctor,
        contentHTML:
          this.props.infoDoctor &&
          this.props.infoDoctor.Markdown &&
          this.props.infoDoctor.Markdown.contentHTML
            ? this.props.infoDoctor.Markdown.contentHTML
            : "",
        contentMarkdown:
          this.props.infoDoctor &&
          this.props.infoDoctor.Markdown &&
          this.props.infoDoctor.Markdown.contentMarkdown
            ? this.props.infoDoctor.Markdown.contentMarkdown
            : "",
        doctorDesc:
          this.props.infoDoctor &&
          this.props.infoDoctor.Markdown &&
          this.props.infoDoctor.Markdown.description
            ? this.props.infoDoctor.Markdown.description
            : "",
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

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    this.props.getInfoDoctor(selectedOption.value);
    this.setState({ editInfo: true });
  };

  handleChangeDesc = (e) => {
    this.setState({
      doctorDesc: e.target.value,
    });
  };

  handleSaveDoctor = () => {
    this.props.saveInfoDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.doctorDesc,
      doctorId: this.state.selectedOption.value,
    });
    this.setState({
      contentHTML: "",
      contentMarkdown: "",
      doctorDesc: "",
    });
  };

  render() {
    const { selectedOption } = this.state;
    return (
      <div className="container">
        <div className="title mb-5">Manage Doctors</div>
        <div className="desc-doctor">
          <div className="content-left">
            <label>Choose Doctor</label>
            <Select
              value={selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctors}
            />
          </div>
          <div className="content-right">
            <label>Infor of Doctor</label>
            <textarea
              className="doctor-desc"
              rows={4}
              onChange={(e) => this.handleChangeDesc(e)}
              value={this.state.doctorDesc}
            ></textarea>
          </div>
        </div>
        <div className="markdown-doctor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown ? this.state.contentMarkdown : ""}
          />
        </div>
        <button
          className="save-doctor-desc btn-primary"
          onClick={() => this.handleSaveDoctor()}
        >
          {" "}
          {this.state.editInfo === true ? "Save Change" : "Save"}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctor: state.admin.allDoctors,
    infoDoctor: state.admin.infoDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    getInfoDoctor: (id) => dispatch(actions.getInfoDoctor(id)),
    saveInfoDoctor: (data) => dispatch(actions.saveInfoDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
