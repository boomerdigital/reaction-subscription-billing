import nock from "nock";
import { expect } from "meteor/practicalmeteor:chai";
import { Meteor } from "meteor/meteor";
import { Factory } from "meteor/dburles:factory";
import { Reaction } from "/server/api";
import { sinon } from "meteor/practicalmeteor:sinon";
import Fixtures from "/server/imports/fixtures";
import { Subscriptions } from "./lib/collections/collections";
import { methods } from "./methods/subscription-payments";
import { getShop } from "/server/imports/fixtures/shops";
import { Logger as logger } from "/server/api";

Fixtures();

describe("subscription/process", function () {
  const user = Factory.create("registeredUser");
  const shop = getShop();
  const userId = user._id;
  const cart = Factory.create("cartTwo");
  const sessionId = Reaction.sessionId = Random.id();
  let sandbox;


  before(function () {});

  beforeEach(function () {
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

  it("subcriptions/process", function(){
    Meteor.call("subscriptions/process",user,cart,"monthly_999",function(error,response){
      expect(response.id).to.not.be.null;
      done();
  });
});
// });


