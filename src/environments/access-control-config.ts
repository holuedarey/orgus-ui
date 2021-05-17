import { NbAccessControl } from "@nebular/security";
import { AuthPermissionID } from "src/app/pages/auth/auth-permissions";
import { ExceptionPermissionID } from "src/app/pages/exceptions/exceptions-permissions";
import { PagesPermissionID } from "src/app/pages/pages-permissions";

export const AccessControl: NbAccessControl[] = [
    {
        // not logged in
        guest: {
            read: [
                // Can view all Exception Pages
                ...Object.values(ExceptionPermissionID),

                // Can View Auth pages apart from change password
                AuthPermissionID.Login,
                AuthPermissionID.ResetPassword,
                AuthPermissionID.RequestPassword,
            ],
        },

        // logged in user
        user: {
            // All Permissions of guest
            parent: 'guest',
            create: [],
            read: [
                // All Auth Pages
                AuthPermissionID.UpdatePassword,

                // View Dashboard
                PagesPermissionID.Dashboard
            ],
            update: [],
            delete: [],
        }
    }
]