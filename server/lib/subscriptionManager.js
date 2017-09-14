import {Config} from  '../config'
import {Subscription} from './lib/collections'

class SubscriptionManager{
    var  adapter;

    constructor(adapterClassName){
     adapter= _adapterFactoryMethod;
      if (adapter==nil)
           throw "Adapter not found";
    }

    _adapterFactoryMethod(name){
      return Config.adapters[name];
    }

    createSubscription(subscription){
        return adapter.createSubscription(subscription);
    }

    getSubscription(){
        return adapter.getSubscription();
    }

    updateSubscription(subscription){
        return adapter.updateSubscription();
    }

    cancelSubscription(subscription){
      return adapter.cancelSubscription();
    }

    listSubscriptions(filterList){
        return adapter.listSubsriptions(filterList);
    }



}