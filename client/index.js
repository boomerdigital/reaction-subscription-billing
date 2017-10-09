import "./templates/subscriptions.html";
import "./templates/subscriptions";

import { registerComponent } from "@reactioncommerce/reaction-components";

import {
  Subscription,
  PlansList,
} from "./components";

import {
  SubscriptionContainer,
  PlansListContainer
} from "./containers";

registerComponent("Subscription", Subscription);
registerComponent("PlansList", PlansList);
