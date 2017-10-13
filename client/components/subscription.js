import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components } from "@reactioncommerce/reaction-components";
import PlansList from "./plansList";

class Subscription extends Component {

  get cart() {
    return this.props.storedCart || {};
  }

  get order() {
    return this.props.order || {};
  }

  render() {
    return (
      <PlansList
        plans={this.props.subscriptionPlans}
      />
    );
  }
}

Subscription.propTypes = {
  storedCart: PropTypes.object,
  onAddToCart: PropTypes.func,
  subscriptionPlans: PropTypes.array
}

export default Subscription;
