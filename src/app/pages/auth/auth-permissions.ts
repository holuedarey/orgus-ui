import { PermissionModel } from "src/app/@core/models/permission.model";

export enum AuthPermissionID {
    Login = 'auth:login',
    RequestPassword = 'auth:request-password',
    ResetPassword = 'auth:reset-password',
    UpdatePassword = 'auth:update-password',
}

export const AuthPermissions = new Map<string, PermissionModel>([
    [
        AuthPermissionID.Login,
        {
            route: `/auth/login`,
            path: 'login'
        }
    ],
    [
        AuthPermissionID.RequestPassword,
        {
            route: '/auth/request-password',
            path: 'request-password'
        }
    ],
    [
        AuthPermissionID.ResetPassword,
        {
            route: '/auth/reset-password',
            path: 'reset-password'
        }
    ],
    [
        AuthPermissionID.UpdatePassword,
        {
            route: '/auth/update-password',
            path: 'update-password'
        }
    ],
])
