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
        createPlan: function(args) {
            logger.info("Creating new plan: ", args.name);
            let result = Promise.await( stripe().plans.create({
                            id: args.id,
                            name: args.name,
                            currency: args.currency,
                            amount: args.amount,
                            interval: args.interval
                }).catch(function (error) {
                    logger.error("Error creating plan", error);
                })
            );
            return result;
        },
        listPlans: function() {
            logger.info("Adapter listing plans:");
            let plansListResults;
            try {
                const plansListPromise = stripe().plans.list({});
                plansListResults = Promise.await(plansListPromise);
            } catch(error) {
                logger.error("Error listing plans in adapter", error.message);
            }

            const result = [];
            if (plansListResults && plansListResults.data) {
                for (const plan of plansListResults.data) {
                    result.push(plan);
                }
            }
            console.log("******************");
            console.log(result);
            console.log("******************");
            
            return result;
        },
        deletePlan: function(planId) {
            logger.info("Adapter deleting plan:", planId);
            let result = Promise.await( stripe().plans.del(
                    planId
                ).catch(function (error) {
                    logger.error("Error deleting plan in adapter", error);
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


