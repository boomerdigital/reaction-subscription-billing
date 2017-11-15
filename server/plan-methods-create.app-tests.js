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

describe("plans/create", function () {
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

    it("KN Creates a new plan based on the planData", function(){
        const planData = {
            id: "some_demo_plan", 
            name: "Some Demo Plan", 
            amount: 1000, 
            currency: "usd",
            interval: "month"
        };
        Meteor.call("plans/create",planData,function(error,plan){
            expect(plan.id).to.not.be.null;
            console.log(`console.log: Plan that was created is: ${plan}`);
            logger.info("Plan that was created is: ", plan);
            done();
        });
    });
});


