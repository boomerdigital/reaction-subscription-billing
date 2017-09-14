import {Config} from  '../config'

class SubscriptionManager{
    const  adapter;

    constructor(adapterClassName){
     adapter= _adapterFactoryMethod;
      if (adapter==nil)
           throw "Adapter not found";
    }

    _adapterFactoryMethod(name){
      return Config.adapters[name];
    }

}