import { AppPermissions } from "src/app/app-permissions";
import { AuthPermissions } from "src/app/pages/auth/auth-permissions";
import { ExceptionPermissions } from "src/app/pages/exceptions/exceptions-permissions";
import { PagesPermissions } from "src/app/pages/pages-permissions";
import { PermissionModel } from "../models/permission.model";

export const GlobalPermissions = new Map<string, PermissionModel>([
    ...AppPermissions,
    ...PagesPermissions,
    ...ExceptionPermissions,
    ...AuthPermissions,
]);
