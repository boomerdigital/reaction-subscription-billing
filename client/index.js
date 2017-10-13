import "./templates/subscriptions.html";
import "./templates/subscriptions";

import { registerComponent } from "@reactioncommerce/reaction-components";

import {
  Subscription,
  Plan,
  PlansList,
} from "./components";

import "./containers";

registerComponent("subscription", Subscription);
registerComponent("plan", Plan);
registerComponent("plansList", PlansList);
