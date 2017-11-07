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
    "subscriptions/process": function (user,customer, order, planId) {

        //ToDo improve verification where Object is used by defining required attributes
        check(user, Object)
        check(customer, Object)
        check(order, Object)
        check(planId, String)

        logger.info(`Processing subscription for user ${user._id}`);
        let manager = SubscriptionManager(Config.config.subscription_processor);

        let future = new Future();
        try {
            let subscription = {user: user, order: order, planId: planId}
            let result=future.return(manager.createSubscription(customer,subscription));
            logger.info(`Result: ${result}`);

        } catch (err) {
            logger.error("Error processing subscription", err);
        }

        return future.wait();

    }


})


