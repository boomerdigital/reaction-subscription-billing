import nock from "nock";
import {expect} from "meteor/practicalmeteor:chai";
import {Meteor} from "meteor/meteor";
import {Factory} from "meteor/dburles:factory";
import {Reaction} from "/server/api";
import {sinon} from "meteor/practicalmeteor:sinon";
import Fixtures from "/server/imports/fixtures";
import {Subscriptions} from "./lib/collections/collections"
import { SubscriptionManager } from "./lib/subscriptionManager";
import {getShop} from "/server/imports/fixtures/shops";

Fixtures();



describe("SubscriptionManager", function () {
    const user = Factory.create("registeredUser");
    const shop = getShop();
    const userId = user._id;
    const cart = Factory.create("cartTwo");
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

    });

    afterEach(function () {
        sandbox.restore();
    });

    after(function () {
        Meteor.users.remove({});
    });


    afterEach(function () {
        Meteor.users.remove({});
    });

    it("Contacts the gateway for stripe and creates a subscription", function(){
        let manager=new SubscriptionManager('stripe');
        const subscriptionData={user: user,cart: cart, planId:"monthly_999"};
        const response=manager.createSubscription(subscriptionData);
        expect(response.id).to.not.be.null;
    });

});