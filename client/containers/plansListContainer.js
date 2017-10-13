import React, { Component } from "react";
import PropTypes from "prop-types";
import { registerComponent } from "@reactioncommerce/reaction-components";
import { Reaction } from "/client/api";
import PlansList from "../components/plansList";

const wrapComponent = (Comp) => (
  class PlansListContainer extends Component {
    static propTypes = {
      plans: PropTypes.array
    }

    constructor(props) {
      super(props);
    }


    render() {
      return (
        <Comp
          plans={this.props.plans}
        />
      );
      return null;
    };
  }
);

registerComponent("PlansList", PlansList, wrapComponent);

export default wrapComponent(PlansList);
