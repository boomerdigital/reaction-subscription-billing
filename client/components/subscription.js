import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components } from "@reactioncommerce/reaction-components";
import { ReactionLayout } from "/imports/plugins/core/layout/lib";
import { PlansList } from "./";

class Subscription extends Component {

  get cart() {
    return this.props.storedCart || {};
  }

  get order() {
    return this.props.order || {};
  }

  render() {
    this.props.onAddToCart();
    return (
      <PlansList />
    );
  }
}

Subscription.propTypes = {
  storedCart: PropTypes.object,
  onAddToCart: PropTypes.func
}

export default Subscription;
