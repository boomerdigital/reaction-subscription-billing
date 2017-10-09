import React, { Component } from "react";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import { Subscription } from "../components/subscription";
import PlansListContainer from "./plansListContainer";

class SubscriptionContainer extends Component {
  render() {
    console.log("here in SubscriptionContainer")
    return (
      <PlansListContainer />
    );
    return null;
  };
}

function composer(props, onData) {
  onData(null, {});
}

registerComponent("SubscriptionContainer", SubscriptionContainer, composeWithTracker(composer));

export default composeWithTracker(composer)(SubscriptionContainer);
