import { PermissionModel } from "./@core/models/permission.model";

export enum AppPermissionID {
    Landing = 'app:landing',
    Auth = 'app:auth',
    App = 'app:app',
    Error = 'app:error'
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
    [
        AppPermissionID.Error,
        {
            route: '/error',
            path: 'error'
        }
    ],
]);
