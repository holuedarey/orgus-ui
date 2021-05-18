import { NbAccessControl } from "@nebular/security";
import { AuthViewResources } from "src/app/pages/auth/auth-resources";
import { ExceptionViewResources } from "src/app/pages/exceptions/exceptions-resources";
import { PagesViewResources } from "src/app/pages/pages-resources";

export const AccessControl: NbAccessControl[] = [
    {
        // not logged in
        guest: {
            read: [
                // Can view all Exception Pages
                ...Object.values(ExceptionViewResources),

                // Can View Auth pages apart from change password
                AuthViewResources.Login,
                AuthViewResources.ResetPassword,
                AuthViewResources.RequestPassword,
            ],
        },

        // logged in user
        user: {
            // All Permissions of guest
            parent: 'guest',
            create: [],
            read: [
                // All Auth Pages
                AuthViewResources.UpdatePassword,

                // View Dashboard
                PagesViewResources.Dashboard
            ],
            update: [],
            delete: [],
        }
    }
]