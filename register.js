import { Reaction } from '/server/api';

Reaction.registerPackage({
    label: 'Reaction Subscription Billing',
    name: 'reaction-wish-list',
    icon: 'fa fa-thumb-tack',
    autoEnable: true,
    settings: {
    },
    registry: [
        {
            route: '/dashboard/subscriptions',
            provides: 'dashboard',
            workflow: 'coreWorkflow',
            name: 'dashboardProductImporter',
            label: 'Subscriptions',
            description: 'Subscriptions ',
            icon: 'fa fa-repeat',
            container: 'core',
            template: 'subscriptions',
            priority: 2
        },
        {
            route: "/subscriptions/plans",
            name: "subscriptions",
            template: "subscriptions",
            workflow: "coreWorkflow",
            layout: "coreLayout"
        },
    ]
})
