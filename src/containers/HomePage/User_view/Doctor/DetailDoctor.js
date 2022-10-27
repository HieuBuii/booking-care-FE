import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../../store/actions";
import { LENGUAGES } from "../../../../utils/constant";
import HomeHeader from "../../HomeHeader";
import "./DetailDoctor.scss";
import actionTypes from "../../../../store/actions/actionTypes";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoDoctor: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.infoDoctor !== this.props.infoDoctor) {
      this.setState({
        infoDoctor: this.props.infoDoctor,
      });
    }
  }

  componentDidMount() {
    this.props.getInfoDoctor(this.props.match.params.id);
  }

  render() {
    let { infoDoctor } = this.state;
    console.log(infoDoctor);
    let language = this.props.language;
    let valueVi = "",
      valueEn = "";
    if (infoDoctor && infoDoctor.positionData) {
      valueVi = `${infoDoctor.positionData.valueVi}, ${infoDoctor.lastName} ${infoDoctor.firstName}`;
      valueEn = `${infoDoctor.positionData.valueEn}, ${infoDoctor.firstName} ${infoDoctor.lastName}`;
    }
    let dataContent =
      infoDoctor && infoDoctor.Markdown ? infoDoctor.Markdown.contentHTML : "";
    return (
      <>
        <HomeHeader />

        <div className="container detail-doctor-top">
          <div className="detail-doctor-top-left">
            <div
              className="avatar-doctor"
              style={{
                backgroundImage:
                  infoDoctor && infoDoctor.image
                    ? `url(${infoDoctor.image})`
                    : "",
              }}
            ></div>
          </div>
          <div className="detail-doctor-top-right">
            <p className="detail-doctor-title">
              {language === LENGUAGES.VI ? valueVi : valueEn}
            </p>
            <p className="detail-doctor-des">
              {infoDoctor && infoDoctor.Markdown
                ? infoDoctor.Markdown.description
                : ""}
            </p>
          </div>
        </div>
        <div className="detail-doctor-content">
          <div className="container">
            <div dangerouslySetInnerHTML={{ __html: dataContent }} />
          </div>
        </div>
        <div className="detail-doctor-comments"></div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    infoDoctor: state.admin.infoDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getInfoDoctor: (id) => dispatch(actions.getInfoDoctor(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
