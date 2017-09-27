import stripePackage from 'stripe';
import {SubscriptionsConfig as Config} from "../../config"
import {Logger as logger} from "/server/api";

export const StripeAdapter = function () {


    function stripe() {
        let stripe = stripePackage(Config.config.stripe_secret_key);
        return stripe;
    }

    return {
        createCustomer: function(reactionUser){
            let result=Promise.await( stripe().customers.create({
                email:reactionUser.emails[0].address
            }).catch(function(error){
                logger.error("Error creating subscription", error);
            }));
            return result;
        },
        createSubscription: function (customer,subscription) {
            const user  = subscription.user;
            const planId= subscription.planId;
            const order = subscription.order;
            logger.info("Creating new subscription for Customer:",customer.id );
            let result = Promise.await( stripe().subscriptions.create({
                        customer: customer.id,
                        items: [{ plan: planId  }],
                        metadata: {orderId : order._id}
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


