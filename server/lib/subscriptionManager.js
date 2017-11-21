import {SubscriptionsConfig} from  '../config'
import {Logger as logger} from "/server/api";
import {Subscriptions, Plans} from "../../lib/collections";

class SubscriptionManager {

    constructor(adapter_name) {
        if (adapter_name == undefined) {
          throw new TypeError("Need to pass subscription processor to new SubscriptionManager instance. Check Config.config.subscription_processor or ENV variables");
        } else {
          this.adapter = new SubscriptionsConfig.config.adapters[adapter_name]();  
        }
    }

    createSubscription(customer,paramsHash) {
        let subscription = this.adapter.createSubscription(customer,paramsHash );
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
    }
    
    createPlan(args) {
        let plan = this.adapter.createPlan(args);

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

        Plans.insert(planReceipt);
        return plan;
    }
    listPlans() {
        let plansList = this.adapter.listPlans();
        return plansList;
    }

    deletePlan(planId) {
        let deletedPlan = this.adapter.deletePlan(planId);
        return deletedPlan;
    }

    fetchTransaction(transactionId) {
        return this.adapter.fetchTransaction(transactionId);
    }

    fetchCustomer(customerId){
        return this.adapter.fetchCustomer(customerId);
    }
}

export default SubscriptionManager;