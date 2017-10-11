import "./templates/subscriptions.html";
import "./templates/subscriptions";

import { registerComponent } from "@reactioncommerce/reaction-components";

import {
  Subscription,
  PlansList,
} from "./components";

import {
  PlansListContainer
} from "./containers";

registerComponent("subscription", Subscription);
registerComponent("PlansList", PlansList);
