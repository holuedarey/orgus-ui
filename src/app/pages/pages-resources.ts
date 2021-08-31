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
    PerformanceModuleView = 'pages:performance-module-view',
    PowerSourcePerformanceView = 'pages:power-source-performance-view',
    GeneratingSetPerformanceView = 'pages:generating-set-performance-view',
    LoadPointPerformanceView = 'pages:load-point-performance-view',
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
        PagesResources.PerformanceModuleView,
        {
            route: `/app/performance-management`,
            path: 'performance-management'
        }
    ],
    [
        PagesResources.PowerSourcePerformanceView,
        {
            route: `/app/performance-management/power-source-performance`,
            path: 'power-source-performance'
        }
    ],
    [
        PagesResources.GeneratingSetPerformanceView,
        {
            route: `/app/performance-management/generating-set-performance`,
            path: 'generating-set-performance'
        }
    ],

    [
        PagesResources.LoadPointPerformanceView,
        {
            route: `/app/performance-management/load-point-performance`,
            path: 'load-point-performance'
        }
    ],
])
