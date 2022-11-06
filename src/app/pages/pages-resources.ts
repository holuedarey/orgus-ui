import { ResourceNavModel } from "../@core/models/resource-nav.model";

export enum PagesResources {
    DashboardView = 'pages:dashboard-view',
    UsersView = 'pages:users-view',
    ServiceBandView = 'pages:service-band-view',
    AnalyticsModuleView = 'pages:analytics-module-view',
    LoadPointAnalyticsView = 'pages:load-point-analytics-view',
    LoadPointsView = 'pages:load-point-analytics-view'
}

export const PagesResourcesNavMap = new Map<PagesResources, ResourceNavModel>([
    [
        PagesResources.DashboardView,
        {
            route: `/app/dashboard`,
            path: 'dashboard'
        }
    ],
    [
        PagesResources.UsersView,
        {
            route: `/app/users`,
            path: 'users'
        }
    ],
    [
        PagesResources.ServiceBandView,
        {
            route: `/app/tariff-management/service-band`,
            path: 'service-band'
        }
    ],
    [
        PagesResources.AnalyticsModuleView,
        {
            route: `/app/analytics`,
            path: 'analytics'
        }
    ],

    [
        PagesResources.LoadPointAnalyticsView,
        {
            route: `/app/analytics/load-point-analytics`,
            path: 'load-point-analytics'
        }
    ],
])
