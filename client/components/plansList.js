import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components, registerComponent } from "@reactioncommerce/reaction-components";
import Plan from "./plan";

class PlansList extends Component {
  // get plans options

  renderPlans(plans) {
    if (Array.isArray(plans)) {
      return plans["data"].map((plan, index) => {
        return (
          <Plan
            plan={plan} key={index} index={index}
          />
        );
      });
    }
    return (
      <div className="row">
        <div className="text-center">
          <h3>
            No subscription plans found.
          </h3>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container-main">
        <ul className="plans-list">
          {this.renderPlans(this.props.plans)}
        </ul>
      </div>
    );
  }
}

PlansList.propTypes = {
  plans: PropTypes.array
}

export default PlansList;
