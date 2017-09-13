import {SimpleSchema } from "meteor/aldeed:simple-schema";


export const SubscriptionItem = new SimpleSchema({
    productId: {
        type: String,
        optional: false
    },
    variantId: {
        type: String,
        optional: true
    },
    name: { // Why do we want this?
        type: String,
        defaultValue: "Reaction Subscription",
        label: ""
    }

});

export const Subscription= new SimpleSchema({

    Id: {
        type: String,
        optional: true
    },
    userId: {
        type: String,
        unique:true
    },
    items: {
        type: [SubscriptionItem],
        optional: true
    }

});