
import {expect} from "meteor/practicalmeteor:chai";
import {Meteor} from "meteor/meteor";
import {Factory} from "meteor/dburles:factory";
import {Reaction} from "/server/api";
import {Products, Accounts} from "/lib/collections";
import {sinon} from "meteor/practicalmeteor:sinon";
import Fixtures from "/server/imports/fixtures";
import {Subscriptions} from "./lib/collections/collections"
import {getShop} from "/server/imports/fixtures/shops";

Fixtures();



describe("SubscriptionManager", function () {
    const user = Factory.create("registeredUser");
    const shop = getShop();
    const userId = user._id;
    const sessionId = Reaction.sessionId = Random.id();
    let sandbox;


    before(function () {
    });

    beforeEach(function () {
        Wishlist.remove({});
        sandbox = sinon.sandbox.create();
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

    it("Configures a subscription manager for a desired gateway", function(){

        expect(1+1).eq(3);
    });



});