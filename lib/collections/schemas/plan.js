import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { registerSchema } from "/imports/plugins/core/collections";

export const Plan = new SimpleSchema({

    id: {
        type: String,
        optional: false,
        unique: true,
        label: "Plan ID"
    },
    name: {
        type: String,
        optional: false,
        unique:true,
        label: "Plan name"
    },
    amount: {
        type: Number,
        optional: false,
        label: "Plan billing amount"
    },
    currency: {
        type: String,
        optional: false,
        label: "Plan billing currency"
    },
    interval: {
        type: String,
        optional: false,
        label: "Plan billing frequency",
        allowedValues: ["day", "week", "month", "year"]
    }
});

registerSchema("Plan", Plan);