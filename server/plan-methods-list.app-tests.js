import nock from "nock";
import {expect} from "meteor/practicalmeteor:chai";
import {Meteor} from "meteor/meteor";
import {Factory} from "meteor/dburles:factory";
import {Reaction} from "/server/api";
import {sinon} from "meteor/practicalmeteor:sinon";
import Fixtures from "/server/imports/fixtures";
import {Plans} from "../lib/collections/collections"
import {getShop} from "/server/imports/fixtures/shops";
import {Logger as logger} from "/server/api";

Fixtures();

describe("plans/list", function () {
    let sandbox;

    before(function () {
        Plans.direct.remove({});
    });

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
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

    it("KN Lists all plan items currently in Stripe", function(){
        Meteor.call("plans/list", function(error,plansList){
            let plans = plansList.data;
            logger.info("Plans List: ", plansList);
            logger.info("Plans in stripe are: ", plans);
            expect(plans).to.eq(["foobar"]);
            done();
        });
    });
});


