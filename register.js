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
            provides: 'dashboard',
            label: 'Subscriptions',
            description: 'Subscriptions ',
            route: '/dashboard/subscriptions',
            icon: 'fa fa-repeat',
            container: 'core',
            template: 'subscriptions',
            name: 'dashboardProductImporter',
            workflow: 'coreWorkflow',
            priority: 2
        }
    ]
})