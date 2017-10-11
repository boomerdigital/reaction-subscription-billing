import {SimpleSchema } from "meteor/aldeed:simple-schema";


// export const SubscriptionItem = new SimpleSchema({
//     productId: {
//         type: String,
//         optional: false
//     },
//     variantId: {
//         type: String,
//         optional: true
//     }
//
// });
//
//
// export const MetadataField = new SimpleSchema({
//     key: {
//         type: String,
//         optional: false
//     },
//     value: {
//         type: String,
//         optional: false
//     }
//
// });

export const Subscription = new SimpleSchema({

    id: {
        type: String,
        optional: true
    },
    userId: {
        type: String,
        unique:false
    },
    nextBillingDate: {
        type: Date,
        optional: false
    },
    // items: {
    //     type: [SubscriptionItem],
    //     optional: true
    // },
    // trialPeriodMilliseconds: {
    //     type: Number,
    //     optional: false
    // },
    // trialPeriodUnitType: {
    //     type: String,
    //     optional: false,
    //     allowedValues: ["days","months"]
    // },
    // createdDate: {
    //     type: String,
    //     optional: false
    // },
    // nextBillingDate: {
    //     type: Date,
    //     optional: false
    // },
    // //Key value data for backend/api specific fields.
    // metadata: {
    //     type: [MetadataField],
    //     optional: false
    // }
});
