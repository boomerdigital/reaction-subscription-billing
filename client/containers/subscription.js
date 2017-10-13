import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import { Meteor } from "meteor/meteor";
import { Reaction } from "/client/api";
import { Orders, Cart } from "/lib/collections";
import Subscription from "../components/subscription";

function copyCart() {
  const storedCart = Cart.findOne();
  return Meteor.call("cart/copyCartToOrder", storedCart._id)
}

function listPlans(){
  let plans = Meteor.call("subscriptions/listPlans", { limit: 3 }, (error, result) => {
    if (error) {
      console.error("Error", error);
    } else {
      console.info("Result", result);
    }
  });
  return plans;
}

const wrapComponent = (Comp) => (
  class SubscriptionContainer extends Component {
    static propTypes = {
      storedCart: PropTypes.object
    }

    constructor(props) {
      super(props);
    }

    handleAddToCart = () => {
      const orderId = copyCart();
      if ( orderId ) {

      } else {
        // catch the error
        // redirect to what needs to be done
      }
    }

    render() {
      return (
        <Comp
          storedCart={this.props.storedCart}
          onAddToCart={this.handleAddToCart}
          {...this.props}
        />
      );
      return null;
    };
  }
);

function composer(props, onData) {
  const storedCart = Cart.findOne();
  const subscriptionPlans = listPlans();

  if(storedCart) {
    onData(null, {
      storedCart,
      copyCart,
      subscriptionPlans
    });
  } else {
    onData(null, {});
  }
}

registerComponent("Subscription", Subscription, [
  composeWithTracker(composer),
  wrapComponent
]);

export default compose(
  composeWithTracker(composer),
  wrapComponent
)(Subscription);
