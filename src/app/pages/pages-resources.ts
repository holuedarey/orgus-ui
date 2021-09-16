import { ResourceNavModel } from "../@core/models/resource-nav.model";

export enum PagesResources {
    DashboardView = 'pages:dashboard-view',
    UsersView = 'pages:users-view',
    ClientsView = 'pages:clients-view',
    AssetsView = 'pages:assets-view',
    MetersView = 'pages:meters-view',
    LoadPointsView = 'pages:load-points-view',
    PowerStationsView = 'pages:power-stations-view',
    GeneratingSetView = 'pages:generating-units-view',
    TariffModuleView = 'pages:tariff-management-view',
    TariffView = 'pages:tarrif-view',
    ServiceBandView = 'pages:service-band-view',
    AnalyticsModuleView = 'pages:analytics-module-view',
    PowerSourceAnalyticsView = 'pages:power-source-analytics-view',
    GeneratingSetAnalyticsView = 'pages:generating-set-analytics-view',
    LoadPointAnalyticsView = 'pages:load-point-analytics-view',
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
        PagesResources.ClientsView,
        {
            route: `/app/clients`,
            path: 'clients'
        }
    ],
    [
        PagesResources.AssetsView,
        {
            route: `/app/assets`,
            path: 'assets'
        }
    ],
    [
        PagesResources.MetersView,
        {
            route: `/app/assets/meters`,
            path: 'meters'
        }
    ],
    [
        PagesResources.LoadPointsView,
        {
            route: `/app/assets/load-points`,
            path: 'load-points'
        }
    ],
    [
        PagesResources.PowerStationsView,
        {
            route: `/app/assets/power-stations`,
            path: 'power-stations'
        }
    ],

    [
        PagesResources.GeneratingSetView,
        {
            route: `/app/assets/generating-units`,
            path: 'generating-units'
        }
    ],
    [
        PagesResources.TariffModuleView,
        {
            route: `/app/tariff-management`,
            path: 'tariff-management'
        }
    ],
    [
        PagesResources.TariffView,
        {
            route: `/app/tariff-management/tariff`,
            path: 'tariff'
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
        PagesResources.PowerSourceAnalyticsView,
        {
            route: `/app/analytics/power-source-analytics`,
            path: 'power-source-analytics'
        }
    ],
    [
        PagesResources.GeneratingSetAnalyticsView,
        {
            route: `/app/analytics/generating-set-analytics`,
            path: 'generating-set-analytics'
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
