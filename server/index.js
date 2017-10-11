import "./hooks";
import { Reaction } from "/server/api";
import { Meteor } from "meteor/meteor";
import { Subscriptions } from "./lib/collections/collections";
import { SubscriptionManager } from "./lib/subscriptionManager";
import { StripeAdapter } from "./lib/adapters/stripeAdapter";
import { SubscriptionsConfig } from "./config";
import "./methods/subscription-payments";
