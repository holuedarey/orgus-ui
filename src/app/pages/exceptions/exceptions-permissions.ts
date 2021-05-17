import { PermissionModel } from "src/app/@core/models/permission.model";

export enum ExceptionPermissionID {
    Unauthorised = 'error:unauthorised',
    PageNotFound = 'error:page-not-found',
    UserIdle = 'error:user-idle',
}

export const ExceptionPermissions = new Map<string, PermissionModel>([
    [
        ExceptionPermissionID.Unauthorised,
        {
            route: '/error/unauthorised',
            path: 'unauthorised'
        }
    ],
    [
        ExceptionPermissionID.PageNotFound,
        {
            route: '/error/page-not-found',
            path: 'page-not-found'
        }
    ],
    [
        ExceptionPermissionID.UserIdle,
        {
            route: '/error/user-idle',
            path: 'user-idle'
        }
    ],
])
