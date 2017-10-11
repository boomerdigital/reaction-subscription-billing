import { Components } from "@reactioncommerce/reaction-components";
import { Template } from "meteor/templating";

Template.subscriptions.helpers({
  Subscriptions() {
    return Components.Subscription;
  }
});
