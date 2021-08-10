import { ResourceNavModel } from "../@core/models/resource-nav.model";

export enum PagesResources {
    DashboardView = 'pages:dashboard-view',
    UsersView = 'pages:users-view',
    ClientsView = 'pages:clients-view',
    AssetsView = 'pages:assets-view',
    MetersView = 'pages:meters-view',
    LoadPointsView = 'pages:load-points-view',
    PowerSourcesView = 'pages:power-sources-view',
    GeneratingSetView = 'pages:generating-set-view',
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
        PagesResources.PowerSourcesView,
        {
            route: `/app/assets/power-sources`,
            path: 'power-sources'
        }
    ],
    [
        PagesResources.GeneratingSetView,
        {
            route: `/app/assets/generating-set`,
            path: 'generating-set'
        }
    ]
])
