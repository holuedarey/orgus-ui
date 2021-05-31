import { NbAccessControl } from "@nebular/security";
import { AuthResources } from "src/app/pages/auth/auth-resources";
import { ExceptionResources } from "src/app/pages/exceptions/exceptions-resources";
import { PagesResources } from "src/app/pages/pages-resources";

export const AccessControl: NbAccessControl[] = [
    {
        // not logged in
        guest: {
            view: [
                // Can view all Exception Pages
                ...Object.values(ExceptionResources),

                // Can View Auth pages apart from change password
                AuthResources.LoginView,
                AuthResources.ResetPasswordView,
                AuthResources.RequestPasswordView,
            ],
        },

        // logged in user
        user: {
            // All Permissions of guest
            parent: 'guest',
            create: [],
            view: [
                // All Auth Pages
                AuthResources.UpdatePasswordView,

                // View Dashboard
                PagesResources.DashboardView,

                //View Users
                PagesResources.UsersView, 
                PagesResources.OtherView, 

            ],
            update: [],
            delete: [],
        },

        // Client User
        'clientuser': {
            parent: 'user',
        },

        // Client Admin
        'clientadmin': {
            parent: 'clientuser',
        },

        // Vgg User
        'vgg_user': {
            parent: 'user',
        },

        // Vgg Admin
        'vgg_admin': {
            parent: 'vgg_user',
        },

        // Vgg Admin
        'vgg_superadmin': {
            create: '*',
            view: '*',
            update: '*',
            delete: '*',
        }
    }
]