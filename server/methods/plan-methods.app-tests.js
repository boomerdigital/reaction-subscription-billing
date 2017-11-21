import nock from "nock";
import {expect} from "meteor/practicalmeteor:chai";
import {Meteor} from "meteor/meteor";
import {Factory} from "meteor/dburles:factory";
import {Reaction} from "/server/api";
import {sinon} from "meteor/practicalmeteor:sinon";
import Fixtures from "/server/imports/fixtures";
import {Plans} from "../../lib/collections/collections"
import {getShop} from "/server/imports/fixtures/shops";
import {Logger as logger} from "/server/api";

Fixtures();

describe("plans/list", function () {
    let sandbox;

    before(function () {
    });

    after(function () {
    });

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        let fixturesRoot = "../fixtures/"

        const createPlanResponse = require("../fixtures/plans/createPlanResponse");
        nock('https://api.stripe.com/v1')
            .post('/plans')
            .reply(200, createPlanResponse.response);

        const listPlansResponse = require("../fixtures/plans/listPlansResponse");
        nock('https://api.stripe.com/v1', {"encodedQueryParams":true})
            .get('/plans')
            .reply(200, listPlansResponse);

        const deletePlanResponse = require("../fixtures/plans/deletePlanResponse");
        nock('https://api.stripe.com/v1', {"encodedQueryParams":true})
            .delete('/plans/some_demo_plan')
            .reply(200, deletePlanResponse);

        const planData = {
            id: "some_demo_plan", 
            name: "Some Demo Plan", 
            amount: 1000, 
            currency: "usd",
            interval: "month"
        };
        Meteor.call("plans/delete", planData.id);
    });

    afterEach(function () {
        sandbox.restore();
        Meteor.users.remove({});
        Plans.direct.remove({});
    });

    it("Lists all plan items currently in Stripe", function(){
        const planData = {
            id: "some_demo_plan", 
            name: "Some Demo Plan", 
            amount: 1000, 
            currency: "usd",
            interval: "month"
        };
        Meteor.call("plans/create", planData);

        Meteor.call("plans/list", function(error,result){
            plans = result;
            plansListError = error;
            expect(plansListError).to.be.undefined;
            expect(plans).to.not.be.undefined;
            expect(plans[0].id).to.eq("some_demo_plan")
            done();
        });
    });
});

describe("plans/create", function () {
    let sandbox;

    before(function () {
    });
    
    after(function () {
    });

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        let fixturesRoot = "../fixtures/"

        const createPlanResponse = require("../fixtures/plans/createPlanResponse");
        nock('https://api.stripe.com/v1')
            .post('/plans')
            .reply(200, createPlanResponse.response);

        const listPlansResponse = require("../fixtures/plans/listPlansResponse");
        nock('https://api.stripe.com/v1', {"encodedQueryParams":true})
            .get('/plans')
            .reply(200, listPlansResponse);

        const deletePlanResponse = require("../fixtures/plans/deletePlanResponse");
        nock('https://api.stripe.com/v1', {"encodedQueryParams":true})
            .delete('/plans/some_demo_plan')
            .reply(200, deletePlanResponse);

        const planData = {
            id: "some_demo_plan", 
            name: "Some Demo Plan", 
            amount: 1000, 
            currency: "usd",
            interval: "month"
        };
        Meteor.call("plans/delete", planData.id);
    });

    afterEach(function () {
        sandbox.restore();
        Meteor.users.remove({});
        Plans.direct.remove({});
    });

    it("Creates a new plan in stripe and locally based on the planData", function(){
        const planData = {
            id: "some_demo_plan", 
            name: "Some Demo Plan", 
            amount: 1000, 
            currency: "usd",
            interval: "month"
        };
        Meteor.call("plans/create",planData,function(error,result){
            plan = result;
            plansCreateError = error;
            expect(plan).to.not.be.undefined;
            expect(plan.id).to.not.be.null;
            done();
        });
    });
});

describe("plans/delete", function () {
    let sandbox;

    before(function () {
    });
    
    after(function () {
    });

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        let fixturesRoot = "../fixtures/"

        const createPlanResponse = require("../fixtures/plans/createPlanResponse");
        nock('https://api.stripe.com/v1')
            .post('/plans')
            .reply(200, createPlanResponse.response);

        const listPlansResponse = require("../fixtures/plans/listPlansResponse");
        nock('https://api.stripe.com/v1', {"encodedQueryParams":true})
            .get('/plans')
            .reply(200, listPlansResponse);

        const deletePlanResponse = require("../fixtures/plans/deletePlanResponse");
        nock('https://api.stripe.com/v1', {"encodedQueryParams":true})
            .delete('/plans/some_demo_plan')
            .reply(200, deletePlanResponse);

        const planData = {
            id: "some_demo_plan", 
            name: "Some Demo Plan", 
            amount: 1000, 
            currency: "usd",
            interval: "month"
        };
        Meteor.call("plans/delete", planData.id);
    });

    afterEach(function () {
        sandbox.restore();
        Meteor.users.remove({});
        Plans.direct.remove({});
    });

    it("Deletes a new plan in stripe and locally based on the planData", function(){
        const planData = {
            id: "some_demo_plan", 
            name: "Some Demo Plan", 
            amount: 1000, 
            currency: "usd",
            interval: "month"
        };
        Meteor.call("plans/create", planData);

        Meteor.call("plans/delete",planData,function(error,result){
            deletedPlan = result;
            deletedPlanError = error;
            logger.info("Plan deleted from stripe:", deletedPlan);
            expect(deletedPlanError).to.be.undefined;
            expect(deletedPlan).to.not.be.undefined;
            expect(deletedPlan.id).to.eq(planData.id);
            expect(Plans.find().fetch().count()).to.eq(0);
            done();
        });

        nock.restore();
    });
});