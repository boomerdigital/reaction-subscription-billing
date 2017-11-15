import {SubscriptionsConfig} from  '../config'
import {Logger as logger} from "/server/api";
import {Subscriptions, Plans} from "../../lib/collections";

export const SubscriptionManager = function (name) {

    function getAdapter() {
        let subscriptionAdapter = SubscriptionsConfig.config.adapters[name];
        return subscriptionAdapter;
    }

    return {
        createSubscription: function (customer,paramsHash) {
            let subscription= getAdapter().createSubscription(customer,paramsHash );
            let subscriptionReceipt=
                { id: subscription.id,
                  userId: paramsHash.user._id,
                  nextBillingDate: new Date(1000 * subscription.current_period_end),
                }
            logger.info("Subscription:", JSON.stringify(subscription));
            logger.info("Subscription Receipt",subscriptionReceipt);
            Subscriptions.insert(subscriptionReceipt);
            //Todo decide on returning gateway response or new object
            return subscription;
        },
        createPlan: function(args) {
            let plan = getAdapter().createPlan(args);

            /* 
            shouldn't have to do this, but debugging why I can't just
            pass in 'plan' from above into the 'Plans.insert()' call below.
            kept getting the following error:
                Error: After filtering out keys not in the schema, your object is now empty
            */

            let planReceipt = {
                id: plan.id,
                name: plan.name,
                currency: plan.currency,
                amount: plan.amount,
                interval: plan.interval
            }
            //logger.info("plan created was: ", plan);
            //Plans.insert(plan);
            Plans.insert(planReceipt);
            return plan;
        },
        listPlans: function() {
            let plansList = getAdapter().listPlans();
            logger.info("plans list: ", plansList);
            return plansList;
        },
        deletePlan: function(planId) {
            let deletedPlan = getAdapter().deletePlan(planId);
            return deletedPlan;
        },
        fetchTransaction: function (transactionId) {
            return getAdapter().fetchTransaction(transactionId);
        },
        fetchCustomer: function (customerId){
            return getAdapter().fetchCustomer(customerId);
       }
 }
}



