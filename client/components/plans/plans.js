import {PlansContainer} from "./index"
import { Template } from "meteor/templating";
import { Divider } from "/imports/plugins/core/ui/client/components";

Template.plansComponent.helpers({

    component() {
        console.log("The Plans", PlansContainer );

        return  PlansContainer;
    }
});