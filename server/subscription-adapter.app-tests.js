import nock from "nock";
import {expect} from "meteor/practicalmeteor:chai";
import {Meteor} from "meteor/meteor";
import {Factory} from "meteor/dburles:factory";
import {Reaction} from "/server/api";
import {sinon} from "meteor/practicalmeteor:sinon";
import Fixtures from "/server/imports/fixtures";
import {Subscriptions, Plans} from "../lib/collections/collections"
import { SubscriptionManager } from "./lib/subscriptionManager";
import {SubscriptionsConfig as Config} from "./config";
import {getShop} from "/server/imports/fixtures/shops";
import {Logger as logger} from "/server/api";

Fixtures();

describe("SubscriptionManager", function () {
    const user = Factory.create("registeredUser");
    const shop = getShop();
    const userId = user._id;
    const cart = Factory.create("cartTwo");
    const order = Factory.create("order");
    const sessionId = Reaction.sessionId = Random.id();
    let sandbox;

    before(function () {
    });

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        const createCustomerResponse= require("./createCustomerResponse");
        nock('https://api.stripe.com/v1', 'email=test%40example.com')
            .post('/customers')
            .reply(200, createCustomerResponse);

        const createSubscriptionResponse= require("./createSubscriptionResponse");
        nock('https://api.stripe.com/v1')
            .post('/subscriptions')
            .reply(200, createSubscriptionResponse)

        const createPlanResponse= require("./createPlanResponse");
        nock('https://api.stripe.com/v1')
            .post('/plans')
            .reply(200, createPlanResponse.response)
    });

    afterEach(function () {
        sandbox.restore();
    });

    after(function () {
        Meteor.users.remove({});
        Plans.direct.remove({});
    });

    afterEach(function () {
        Meteor.users.remove({});
        Plans.direct.remove({});
    });

    //ToDo update to take order and retrieve the customer from the transaction
    it("Contacts the gateway for stripe and creates a subscription", function(){
        let manager = new SubscriptionManager(Config.config.subscription_processor);

        const planData = {
          id: "some_demo_plan", 
          name: "Some Demo Plan", 
          amount: 1000, 
          currency: "usd",
          interval: "month"
        };
        let plan = manager.createPlan(planData);

        const subscriptionData = { user: user, cart: cart, planId: plan.id };
        const subscription = manager.createSubscription(subscriptionData);
        expect(subscription.id).to.not.be.null;
    });

    it("Contacts the gateway for stripe and creates a plan", function(){
        let manager = new SubscriptionManager(Config.config.subscription_processor);

        const planData = {
          id: "some_demo_plan", 
          name: "Some Demo Plan", 
          amount: 1000, 
          currency: "usd",
          interval: "month"
        };
        let plan = manager.createPlan(planData);

        expect(plan.id).to.not.be.null;
    });

});
