import nock from "nock";
import {expect} from "meteor/practicalmeteor:chai";
import {Meteor} from "meteor/meteor";
import {Factory} from "meteor/dburles:factory";
import {Reaction} from "/server/api";
import {sinon} from "meteor/practicalmeteor:sinon";
import Fixtures from "/server/imports/fixtures";
import {Subscriptions, Plans} from "../lib/collections/collections"
import SubscriptionManager from "./lib/subscriptionManager";
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
    const demoPlanId = "some_demo_plan";
    let sandbox;

    before(function () {
        Meteor.call("plans/delete", demoPlanId, function(){
            done();
        });
    });

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        // let fixturesRoot = "./fixtures/"

        // const createCustomerResponse = require(fixturesRoot.concat("customers/createCustomerResponse"));
        const createCustomerResponse = require("./fixtures/customers/createCustomerResponse");
        nock('https://api.stripe.com/v1', 'email=test%40example.com')
            .post('/customers')
            .reply(200, createCustomerResponse);

        const createSubscriptionResponse = require("./fixtures/subscriptions/createSubscriptionResponse");
        nock('https://api.stripe.com/v1')
            .post('/subscriptions')
            .reply(200, createSubscriptionResponse);

        const createPlanResponse = require("./fixtures/plans/createPlanResponse");
        nock('https://api.stripe.com/v1')
            .post('/plans')
            .reply(200, createPlanResponse.response);

        const listPlansResponse = require("./fixtures/plans/listPlansResponse");
        nock('https://api.stripe.com/v1', {"encodedQueryParams":true})
            .get('/plans')
            .reply(200, listPlansResponse);

        const deletePlanResponse = require("./fixtures/plans/deletePlanResponse");
        nock('https://api.stripe.com/v1', {"encodedQueryParams":true})
            .delete('/plans/some_demo_plan')
            .reply(200, deletePlanResponse);
    });

    after(function () {
        Meteor.users.remove({});
        Plans.direct.remove({});
    });

    afterEach(function () {
        sandbox.restore();
        Meteor.users.remove({});
        Plans.direct.remove({});
    });

    // it("KN throws an error if subscription processor config isn't passed to new subscription manager instance", function(){        
    //     expect(new SubscriptionManager()).to.throw(TypeError);
    // });

    //ToDo update to take order and retrieve the customer from the transaction
    // it("Contacts the gateway for stripe and creates a subscription", function(){
    //     let manager = new SubscriptionManager(Config.config.subscription_processor);

    //     const planData = {
    //       id: "some_demo_plan", 
    //       name: "Some Demo Plan", 
    //       amount: 1000, 
    //       currency: "usd",
    //       interval: "month"
    //     };
    //     let plan = manager.createPlan(planData);

    //     const subscriptionData = { user: user, cart: cart, planId: plan.id };
    //     const subscription = manager.createSubscription(subscriptionData);
    //     logger.info("subscription created in stripe: ", subscription);
    //     expect(subscription.id).to.not.be.null;
    // });

    it("creates a plan via the gateway", function(){
        let manager = new SubscriptionManager(Config.config.subscription_processor);

        const planData = {
          id: demoPlanId, 
          name: "Some Demo Plan", 
          amount: 1000, 
          currency: "usd",
          interval: "month"
        };
        let plan = manager.createPlan(planData);

        expect(plan.id).to.equal(planData.id);
        expect(plan.name).to.equal(planData.name);
        expect(plan.amount).to.equal(planData.amount);
        expect(plan.currency).to.equal(planData.currency);
        expect(plan.interval).to.equal(planData.interval);
    });

    it("gets a list of plans via the gateway", function(){
        let manager = new SubscriptionManager(Config.config.subscription_processor);
        let plans = manager.listPlans();

        expect(plans).to.not.be.empty;
    });

    it("KN deletes a plan via the gateway", function(){
        const planData = {
            id: "some_demo_plan", 
            name: "Some Demo Plan", 
            amount: 1000, 
            currency: "usd",
            interval: "month"
        };
        let manager = new SubscriptionManager(Config.config.subscription_processor);
        manager.createPlan(planData);

        plan = manager.deletePlan(plan.id);

        expect(plan).to.not.be.undefined;
        expect(plan.id).to.eq(planData.id);
        expect(plan.deleted).to.eq(true);
    });    
});
