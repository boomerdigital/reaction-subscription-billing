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
        createSubscription: function (subscription) {

            logger.info("Creating new customer and subscription", subscription);
            let result = Promise.await(stripe().customers.create({
                    email: 'customer@example.com'
                }).then(function (customer) {
                    return stripe().subscriptions.create({
                        customer: customer.id,
                        items: [
                            {
                                plan: "monthly_999",
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


