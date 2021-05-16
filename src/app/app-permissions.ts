import { PermissionModel } from "./@core/models/permission.model";
import { PagesPermissions } from "./pages/pages-permissions";

export enum AppPermissionID {
    Landing = 'app:landing',
    Auth = 'app:auth',
    App = 'app:app'
}

export const AppPermissions = new Map<string, PermissionModel>([
    [
        AppPermissionID.Landing,
        {
            route: '/',
            path: ''
        }
    ],
    [
        AppPermissionID.Auth,
        {
            route: '/auth',
            path: 'auth'
        }
    ],
    [
        AppPermissionID.App,
        {
            route: '/app',
            path: 'app'
        }
    ],
]);

export const GlobalPermissions = new Map<string, PermissionModel>([
    ...AppPermissions,
    ...PagesPermissions
])