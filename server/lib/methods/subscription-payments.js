import accounting from "accounting-js";
import stripeNpm from "stripe";
import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";
import {Random} from "meteor/random";
import {Reaction, Logger} from "/server/api";
import {StripeApi} from "./stripeapi";
import {Cart, Shops, Accounts, Packages} from "/lib/collections";
import {SubscriptionManager} from "../lib/subscriptionManager"

function selectedPaymentProvider() {

    return "stripe";
}

function userHasAccount(stripeCustomerId) {


    return false;
}

function isCancellation(stripeCustomerId, plan) {

    false;
}


function processNewSubscription() {

}

function processCancellation() {

}


export const methods = {

    "subscriptions/process": async function () {

        let manager = SubscriptionManager(selectedPaymentProvider());


        try {
            if (userHasAccount(){
                if (isCancellation()) {
                    processCancellation();
                } else {
                    processNewSubscription();
                }

            } else {
                //User does not have account
            }
        } catch (err) {
            logger.error
            "Error processing subscription"
        }


    }


}


