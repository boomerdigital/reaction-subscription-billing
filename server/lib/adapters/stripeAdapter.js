import stripePackage from 'stripe';

export default class StripeAdapter{


    import stripePackage from 'stripe';
    var stripe;

    constructor(){
      stripe=_configure();
    }

    createSubscription(subscription){
        stripe.subscriptions.create(
            { email: 'customer@example.com' },
            function(err, customer) {
                err; // null if no error occurred
                customer; // the created customer object
            }
        );
    }

    getSubscription(subscription){

    }


    _configure(){
        stripe = stripePackage(Config.STRIPE_SECRET_KEY);
        //adddtionalConfig
    }

}