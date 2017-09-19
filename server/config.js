import {StripeAdapter} from './lib/adapters/stripeAdapter'

export const SubscriptionsConfig={
    'config': {
        'stripe_secret_key' : process.env.STRIPE_SECRET_KEY,
        'adapters' : {'stripe' : StripeAdapter() }
    }
}
