import { Mongo } from "meteor/mongo";
import * as Schemas from "./schemas";



export const Subscriptions = new Mongo.Collection("Subscriptions");

Subscriptions.attachSchema([
    Schemas.Subscription,
 //   Schemas.SubscriptionItem,
  //  Schemas.MetadataField,
]);