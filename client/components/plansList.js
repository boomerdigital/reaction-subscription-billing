import React, { Component } from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";

class PlansList extends Component {
  render() {
    console.log("yo");
    return (
      <div className="plans-list">
        <h1>I am here now.</h1>
      </div>
    );
  };
}

// registerComponent("PlansList", PlansList);

export default PlansList;
