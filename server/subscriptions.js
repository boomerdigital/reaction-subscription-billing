
import { Meteor } from "meteor/meteor";
import * as Collections from "/lib/collections";
import { Reaction } from "/server/api";
import { Products, Accounts } from "/lib/collections";
import { Subscription } from "./lib/collections/collections";
import { check } from "meteor/check";

Meteor.methods({
  "subscriptions/createFromOrder": function(userId, order){
    check(userId,String);
    check(order, Object);
  }
})
