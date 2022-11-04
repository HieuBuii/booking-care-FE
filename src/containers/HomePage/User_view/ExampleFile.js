import React, { Component } from "react";
import { connect } from "react-redux";
import "./ExampleFile.scss";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

class ExampleFile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    return (
      <>
        <div>ExampleFile</div>
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
  connect(mapStateToProps, mapDispatchToProps)(ExampleFile)
);
