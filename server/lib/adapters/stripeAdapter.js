import stripePackage from 'stripe';
import {SubscriptionsConfig as Config} from "../../config"
import {Logger as logger} from "/server/api";

export const StripeAdapter = function () {


    function stripe() {
        let stripe = stripePackage(Config.config.stripe_secret_key);
        logger.info(`Secret key: ${Config.config.stripe_secret_key}`)
        return stripe;
    };

    return {
       //subscription: {user: user, plan: "planId:string", user: "user:object"}
        createSubscription: function (subscription) {

            logger.info("Creating new customer and subscription: ", subscription.user.emails[0].address );
            let result = Promise.await(stripe().customers.create({
                    email: subscription.user.emails[0].address
                }).then(function (customer) {
                    return stripe().subscriptions.create({
                        customer: customer.id,
                        items: [
                            {
                                plan: subscription.planId,
                            },
                        ]
                    });
                }).catch(function (error) {
                    logger.error("Error creating subscription", error);
                })
            );
            return result;
        }
    }
}


