import {SubscriptionsConfig} from  '../config'
import {Logger} from "/server/api";

export const SubscriptionManager = function (name) {

    function getAdapter() {
        let subscriptionAdapter = SubscriptionsConfig.config.adapters[name];
        return subscriptionAdapter;
    }

    return {
        createSubscription: function (subscription) {
            return getAdapter().createSubscription(subscription);
        },
        fetchTransaction: function (transactionId) {
            return getAdapter().fetchTransaction(transactionId);
        },
        fetchCustomer: function (customerId){
            return getAdapter().fetchCustomer(customerId);
       }
 }
}



