
import {expect} from "meteor/practicalmeteor:chai";
import {Meteor} from "meteor/meteor";
import {Factory} from "meteor/dburles:factory";
import * as Collections from "/lib/collections";
import {Reaction} from "/server/api";
import {Products, Accounts} from "/lib/collections";
import {sinon} from "meteor/practicalmeteor:sinon";
import Fixtures from "/server/imports/fixtures";
import {Wishlist} from "./lib/collections"
import {getShop} from "/server/imports/fixtures/shops";

Fixtures();



describe("Subscription", function () {
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



});