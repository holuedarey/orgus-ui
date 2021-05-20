import { ResourceNavModel } from "src/app/@core/models/resource-nav.model";

export enum AuthViewResources {
    Login = 'auth:login',
    RequestPassword = 'auth:request-password',
    ResetPassword = 'auth:reset-password',
    UpdatePassword = 'auth:update-password',
}

export const AuthResourcesNavMap = new Map<AuthViewResources, ResourceNavModel>([
    [
        AuthViewResources.Login,
        {
            route: `/auth/login`,
            path: 'login'
        }
    ],
    [
        AuthViewResources.RequestPassword,
        {
            route: '/auth/request-password',
            path: 'request-password'
        }
    ],
    [
        AuthViewResources.ResetPassword,
        {
            route: '/auth/reset-password',
            path: 'reset-password'
        }
    ],
    [
        AuthViewResources.UpdatePassword,
        {
            route: '/auth/update-password',
            path: 'update-password'
        }
    ],
])
