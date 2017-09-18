import {SubscriptionConfig} from  '../config'
import { Logger } from "/server/api";

function SubscriptionAdapter(name){

    let subscriptionInterface=SubscriptionConfig.config.adapters[name];

    return {
       createSubscription: function(subscription) {
           return subscriptionInterface.createSubscription(subscription);
       }
    }
}