import {PlansContainer} from "../containers/plansContainer.js"
import {Plans} from "../components/plans/plansComponent.js"
import { Template } from "meteor/templating";
import { Divider } from "/imports/plugins/core/ui/client/components";

Template.plans.helpers({

    component() {
        console.log("The Plans",PlansContainer);

        return  PlansContainer;
    }
});