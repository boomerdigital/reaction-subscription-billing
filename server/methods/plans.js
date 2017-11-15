import accounting from "accounting-js";
import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";
import {Random} from "meteor/random";
import {Reaction, Logger as logger} from "/server/api";
import {Cart, Shops, Accounts, Packages} from "/lib/collections";
import {SubscriptionManager} from "../lib/subscriptionManager"
import {SubscriptionsConfig as Config} from  '../config'

const Future = Npm.require('fibers/future');

Meteor.methods({
    "plans/create": function (args) {

        //ToDo improve verification where Object is used by defining required attributes
        check(args, Object)

        let manager = SubscriptionManager(Config.config.subscription_processor);

        let future = new Future();

        try {
            let result = future.return(manager.createPlan(args));
            logger.info(`Result from plans/create: ${result}`);

        } catch (err) {
            logger.error("Error creating plan in plans/create", err);
        }
        return future.wait();
    },
    "plans/list": function () {

        //ToDo improve verification where Object is used by defining required attributes
        check(args, Object)

        let manager = SubscriptionManager(Config.config.subscription_processor);

        let future = new Future();

        try {
            let result = future.return(manager.listPlans());
            logger.info("Result from plans/list: ", result);

        } catch (err) {
            logger.error("Error listing plan in plans/list", err);
        }
        return future.wait();
    },
    "plans/delete": function (planId) {

        //ToDo improve verification where Object is used by defining required attributes
        check(args, Object)

        let manager = SubscriptionManager(Config.config.subscription_processor);

        let future = new Future();

        try {
            let result = future.return(manager.deletePlan(planId));
            logger.info("Result from plans/delete: ", result);

        } catch (err) {
            logger.error("Error listing plan in plans/delete", err);
        }
        return future.wait();
    }
})


