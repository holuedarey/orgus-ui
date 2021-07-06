import { MeterResources } from './../app/pages/assets/meters/meter-resources';
import { NbAccessControl } from "@nebular/security";
import { AuthResources } from "src/app/pages/auth/auth-resources";
import { ClientResources } from "src/app/pages/clients/client-resources";
import { ExceptionResources } from "src/app/pages/exceptions/exceptions-resources";
import { PagesResources } from "src/app/pages/pages-resources";
import { UsersResources } from "src/app/pages/users/users-resources";

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
                AuthResources.NewPasswordView,
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

                //View Meters
                PagesResources.MetersView,

                //View Load Points
                PagesResources.LoadPointsView,
                
                //View Power Sources
                PagesResources.PowerSourcesView,
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
            create: [
                UsersResources.CreateUsers,
                UsersResources.CreateClientUser,
               
                MeterResources.CreateMeter
            ],
            update: [
                UsersResources.UpdateUsers,
                UsersResources.UpdateClientUser,
                
                MeterResources.UpdateMeter
            ],
        },

        // Vgg User
        'vgg_user': {
            parent: 'user',
            view: [
                UsersResources.ViewClientColumn,
                UsersResources.ViewAllRoles,

                //View Clients
                PagesResources.ClientsView,

                //view meters
                MeterResources.ViewMeterColumn,
            ],
        },

        // Vgg Admin
        'vgg_admin': {
            parent: 'vgg_user',
            create: [
                UsersResources.CreateUsers,
                UsersResources.CreateClientAdmin,
                UsersResources.CreateVggUser,
                UsersResources.SetClient,

                ClientResources.CreateClient,

                MeterResources.CreateMeter
            ],
            update: [
                UsersResources.UpdateUsers,
                UsersResources.UpdateVggUser,
                UsersResources.UpdateClientAdmin,

                ClientResources.UpdateClient,

                MeterResources.UpdateMeter
            ],
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