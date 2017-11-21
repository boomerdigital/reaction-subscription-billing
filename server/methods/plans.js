import accounting from "accounting-js";
import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";
import {Random} from "meteor/random";
import {Reaction, Logger as logger} from "/server/api";
import {Cart, Shops, Accounts, Packages} from "/lib/collections";
import SubscriptionManager from "../lib/subscriptionManager"
import {SubscriptionsConfig as Config} from  '../config'
import {Plans} from "../../lib/collections/collections"

const Future = Npm.require('fibers/future');

Meteor.methods({
    "plans/create": function (planData) {

        //ToDo improve verification where Object is used by defining required attributes
        check(planData, Object)

        let manager = new SubscriptionManager(Config.config.subscription_processor);

        let future = new Future();

        try {
            let result = future.return(manager.createPlan(planData));
        } catch (err) {
            logger.error("Error creating plan in plans/create", err);
        }
        return future.wait();
    },
    "plans/list": function () {
        let manager = new SubscriptionManager(Config.config.subscription_processor);
        let future = new Future();

        try {
            let result = future.return(manager.listPlans());
        } catch (err) {
            logger.error("Error listing plan in plans/list", err);
        }
        return future.wait();
    },
    "plans/delete": function (planId) {
        check(planId, String)

        let manager = new SubscriptionManager(Config.config.subscription_processor);
        let future = new Future();

        try {
            let result = future.return(manager.deletePlan(planId));
            Plans.remove({id: planId});
        } catch (err) {
            logger.error("Error listing plan in plans/delete", err);
        }
        return future.wait();
    }
})


