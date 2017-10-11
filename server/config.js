import { StripeAdapter } from "./lib/adapters/stripeAdapter";

export const SubscriptionsConfig = {
  "config": {
    "subscription_processor": process.env.SUBSCRIPTION_PROCESSOR,
    "stripe_secret_key" : process.env.STRIPE_SECRET_KEY,
    "adapters" : {"stripe" : StripeAdapter() }
  }
}
