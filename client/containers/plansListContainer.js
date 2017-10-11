import React, { Component } from "react";
import PropTypes from "prop-types";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import PlansList from "../components";

class PlansListContainer extends Component {
  handleRender = () => {
  }

  render() {
    console.log("here in PlansListContainer")

    return (
      <PlansList />
    );
  };
}

const composer = (props, onData) => {
  onData(null, {});
};

registerComponent("PlansListContainer", PlansListContainer, composeWithTracker(composer));

export default composeWithTracker(composer)(PlansListContainer);
