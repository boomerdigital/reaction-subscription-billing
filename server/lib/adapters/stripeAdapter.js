import stripePackage from 'stripe';
import {SubscriptionsConfig as Config} from "../../config"
import {Logger as logger} from "/server/api";

class StripeAdapter {

    constructor() {
        this.stripe = stripePackage(Config.config.stripe_secret_key);
    }

    createCustomer(reactionUser){
        let result=Promise.await( this.stripe.customers.create({
            email:reactionUser.emails[0].address
        }).catch(function(error){
            logger.error("Error creating subscription", error.message);
        }));
        return result;
    }

    createSubscription(customer,subscription) {
        const user  = subscription.user;
        const planId= subscription.planId;
        const order = subscription.order;
        logger.info("Creating new subscription for Customer:", customer.id );
        let result = Promise.await( this.stripe.subscriptions.create({
                        customer: customer.id,
                        items: [{ plan: planId  }],
                        metadata: {orderId : order._id}
            }).catch(function (error) {
                logger.error("Error creating subscription", error.message);
            })
        );
        return result;
    }

    createPlan(args) {
        logger.info("Creating new plan: ", args.name);
        let result = Promise.await( this.stripe.plans.create({
                        id: args.id,
                        name: args.name,
                        currency: args.currency,
                        amount: args.amount,
                        interval: args.interval
            }).catch(function (error) {
                logger.error("Error creating plan", error.message);
            })
        );
        return result;
    }

    listPlans() {
        let plansListResults;
        try {
            const plansListPromise = this.stripe.plans.list();
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
        return result;
    }

    deletePlan(planId) {
        logger.info("Adapter deleting plan:", planId);
        let result = Promise.await( this.stripe.plans.del(
                planId
            ).catch(function (error) {
                logger.error("Error deleting plan in adapter", error.message);
            })
        );
        return result;
    }

    fetchTransaction(transactionId){
        return Promise.await(
            this.stripe.charges.retrieve(transactionId).catch(function(error){
            logger.error(`Error retrieving transaction ${transactionId}:`, error.message);
        }));
    }

    fetchCustomer(customerId) {
        return Promise.await(
            this.stripe.customers.retrieve(customerId).catch(function (error) {
                logger.error("Failed to retrieve cutomer", error.message);
            })
        )
    }

}

export default StripeAdapter;