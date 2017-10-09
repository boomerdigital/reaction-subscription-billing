import { Components } from "@reactioncommerce/reaction-components";
import { Template } from "meteor/templating";
import Subscriptions from "../containers/subscription";


Template.subscriptions.helpers({
  subscriptions() {
    return {
      component: Components.Subscription
    };
  }
});
