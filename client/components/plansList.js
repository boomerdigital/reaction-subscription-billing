import React, { Component } from "react";
import { Components, registerComponent } from "@reactioncommerce/reaction-components";
// import Plan from "./plan";

class PlansList extends Component {
  // get plans options
  handlePlanClick = (event, plan) => {

  }

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
