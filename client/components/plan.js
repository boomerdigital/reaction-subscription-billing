import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components, registerComponent } from "@reactioncommerce/reaction-components";

class Plan extends Component {
  renderPlan() {
    return (
      <h1>
        {this.props.plan}
      </h1>
    );
  }
  render() {
    return (
      <li className="plan">
        {this.renderPlan()}
      </li>
    );
  };
}

Plan.propTypes = {
  plan: PropTypes.string
}

export default Plan;
