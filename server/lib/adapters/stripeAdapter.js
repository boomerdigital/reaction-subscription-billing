import stripePackage from 'stripe';
import {SubscriptionsConfig as Config} from "../../config"
import {Logger as logger} from "/server/api";

export const StripeAdapter = function () {


    function stripe() {
        let stripe = stripePackage(Config.config.stripe_secret_key);
        return stripe;
    }

    return {
       //subscription: {user: user, plan: "planId:string", user: "user:object"}
        createSubscription: function (subscription) {
            const order = subscription.order;
            const user  = subscription.user;
            const planId= subscription.planId;

            logger.info("Creating new customer and subscription for: ", subscription.user.emails[0].address );
            let result = Promise.await(stripe().customers.create({
                    email: subscription.user.emails[0].address
                }).then(function (customer) {
                    return stripe().subscriptions.create({
                        customer: customer.id,
                        items: [{ plan: planId  }],
                        metadata: {orderId : order._id}
                    });
                }).catch(function (error) {
                    logger.error("Error creating subscription", error);
                })
            );
            return result;
        },
        fetchTransaction: function(transactionId){
            return Promise.await(
                stripe().charges.retrieve(transactionId).catch(function(error){
                logger.error(`Error retrieving transaction ${transactionId}:`,error);
            }));
        },
        fetchCustomer: function(customerId) {
            return Promise.await(
                stripe().customers.retrieve(customerId).catch(function (error) {
                    logger.error("Failed to retrieve cutomer", error);
                })
            )
        }
    }
}


