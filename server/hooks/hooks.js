import { MethodHooks } from "/server/api";
import { Logger as logger } from "/server/api";
import { Orders, Accounts } from "/lib/collections";
import { SubscriptionManager } from "../lib/subscriptionManager";
import { SubscriptionsConfig as Config } from "../config";


//Was cart/CopyToOrder but could not find the transaction
MethodHooks.after("cart/copyCartToOrder", (options) => {
  const cartId = options.arguments[0];
  const order = Orders.findOne({ cartId: cartId });

  //ToDo
  //Change to take from configuration
  let sm = SubscriptionManager(Config.config.subscription_processor);

  ///Fetch the transaction from the order
  const transaction = order.billing[0].paymentMethod.transactions[0];
  const fullTransactionDetails = sm.fetchTransaction(transaction.id);

  //Then use it to get the customer profile.
  const customerId = fullTransactionDetails.customer;
  const customer = sm.fetchCustomer(customerId);
  logger.info("Customer", JSON.stringify(customer));

  const currentUser = Accounts.findOne({userId: Meteor.userId()});
  //ToDo change to take dynamic planId from interface
  Meteor.call("subscriptions/process", currentUser,customer,order,"monthly_999")

  return options;
});
