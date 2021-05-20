import { ResourceNavModel } from "./@core/models/resource-nav.model";

export enum AppResources {
    Landing = 'app:landing',
    Auth = 'app:auth',
    App = 'app:app',
    Error = 'app:error'
}

export const AppResourcesNavMap = new Map<AppResources, ResourceNavModel>([
    [
        AppResources.Landing,
        {
            route: '/',
            path: ''
        }
    ],
    [
        AppResources.Auth,
        {
            route: '/auth',
            path: 'auth'
        }
    ],
    [
        AppResources.App,
        {
            route: '/app',
            path: 'app'
        }
    ],
    [
        AppResources.Error,
        {
            route: '/error',
            path: 'error'
        }
    ],
]);
