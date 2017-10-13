import React, { Component } from "react";
import PropTypes from "prop-types";
import { registerComponent } from "@reactioncommerce/reaction-components";
import Plan from "../components/plan";

const wrapComponent = (Comp) => (
  class PlanContainer extends Component {
    static propTypes = {
      plan: PropTypes.string
    }

    constructor(props) {
      super(props);
    }


    render() {
      return (
        <Comp
          plan={this.props.plan}
        />
      );
      return null;
    };
  }
);

registerComponent("Plan", Plan, wrapComponent);

export default wrapComponent(Plan);
