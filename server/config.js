const SubscriptionsConfig={
    'config': {
        'stripe_secret_key' : process.env.STRIPE_SECRET_KEY,
        'adapters' : {'stripe' : 'StripeAdapter'}
    }
};
export default SubscriptionsConfig;
