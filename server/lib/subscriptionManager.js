import { SubscriptionsConfig } from  "../config";
import { Logger as logger } from "/server/api";
import { Subscriptions } from "./collections";


export const SubscriptionManager = function (name) {

  function getAdapter() {
    let subscriptionAdapter = SubscriptionsConfig.config.adapters[name];
    return subscriptionAdapter;
  }

  return {
    createSubscription: function (customer,paramsHash) {
      let subscription = getAdapter().createSubscription(customer,paramsHash );
      let subscriptionReceipt =
        { id: subscription.id,
          userId: paramsHash.user._id,
          nextBillingDate: new Date(1000 * subscription.current_period_end),
        }
      logger.info("Subscription:", JSON.stringify(subscription));
      logger.info("Subscription Receipt", subscriptionReceipt);
      Subscriptions.insert(subscriptionReceipt);
      //Todo decide on returning gateway response or new object
      return subscription;
    },
    fetchTransaction: function (transactionId) {
      return getAdapter().fetchTransaction(transactionId);
    },
    fetchCustomer: function (customerId){
      return getAdapter().fetchCustomer(customerId);
    },
    listPlans: function (limit) {
      return getAdapter().listPlans(limit);
    }
  }
}
