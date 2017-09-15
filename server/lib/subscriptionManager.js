import {Config} from  '../config'
import {Subscription} from './lib/collections'
import { Logger } from "/server/api";

class SubscriptionManager{
    let  adapter=null;

    constructor(adapterClassName){
     adapter= _adapterFactoryMethod;
      if (adapter==null)
           throw "Adapter not found";
    }
 dfkjdskjfskjd
    _adapterFactoryMethod(name){
      return Config.adapters[name];
    }

    createSubscription(subscription){
        Logger.info({subscription},"creating subscription");
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