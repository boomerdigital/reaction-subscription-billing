import { SimpleSchema } from "meteor/aldeed:simple-schema";
//import { registerSchema } from "@reactioncommerce/reaction-collections";
import { registerSchema } from "/imports/plugins/core/collections";

export const Subscription = new SimpleSchema({

    id: {
        type: String,
        optional: true,
        unique: true,
        label: "Subscription ID"
    },
    userId: {
        type: String,
        unique:false,
        label: "User ID"
    },
    nextBillingDate: {
        type: Date,
        optional: false,
        label: "Next Billing Date"
    }
});

registerSchema("Subscription", Subscription);

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