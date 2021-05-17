import { PermissionModel } from "../@core/models/permission.model";

export enum PagesPermissionID {
    Dashboard = 'pages:dashboard',
    Other = 'pages:other',
}

export const PagesPermissions = new Map<string, PermissionModel>([
    [
        PagesPermissionID.Dashboard,
        {
            route: `/app/dashboard`,
            path: 'dashboard'
        }
    ],
    [
        PagesPermissionID.Other,
        {
            route: '/app/other',
            path: 'other'
        }
    ],
])
