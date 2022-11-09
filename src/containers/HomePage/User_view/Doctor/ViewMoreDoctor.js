import React, { Component } from "react";
import { connect } from "react-redux";
import "./ViewMoreDoctor.scss";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

class ViewMoreDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    return (
      <>
        <div>ViewMoreDoctor</div>
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
  connect(mapStateToProps, mapDispatchToProps)(ViewMoreDoctor)
);
