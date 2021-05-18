import { ResourceNavModel } from "../@core/models/resource-nav.model";

export enum PagesViewResources {
    Dashboard = 'pages:dashboard',
    Other = 'pages:other',
}

export const PagesResourcesNavMap = new Map<string, ResourceNavModel>([
    [
        PagesViewResources.Dashboard,
        {
            route: `/app/dashboard`,
            path: 'dashboard'
        }
    ],
    [
        PagesViewResources.Other,
        {
            route: '/app/other',
            path: 'other'
        }
    ],
])
