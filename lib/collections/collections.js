import { Mongo } from "meteor/mongo";
import * as Schemas from "./schemas";

export const Subscriptions = new Mongo.Collection("Subscriptions");
Subscriptions.attachSchema(Schemas.Subscriptions);

export const Plans = new Mongo.Collection("Plans");
Plans.attachSchema(Schemas.Plans);