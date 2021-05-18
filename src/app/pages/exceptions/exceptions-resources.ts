import { ResourceNavModel } from "src/app/@core/models/resource-nav.model";

export enum ExceptionViewResources {
    Unauthorised = 'error:unauthorised',
    PageNotFound = 'error:page-not-found',
    UserIdle = 'error:user-idle',
}

export const ExceptionResourcesNavMap = new Map<string, ResourceNavModel>([
    [
        ExceptionViewResources.Unauthorised,
        {
            route: '/error/unauthorised',
            path: 'unauthorised'
        }
    ],
    [
        ExceptionViewResources.PageNotFound,
        {
            route: '/error/page-not-found',
            path: 'page-not-found'
        }
    ],
    [
        ExceptionViewResources.UserIdle,
        {
            route: '/error/user-idle',
            path: 'user-idle'
        }
    ],
])
