import { TariffResources } from './../app/pages/tariff-management/tariff/tariff-resources';
import { ServiceBandResources } from './../app/pages/tariff-management/service-band/service-band-resources';
import { GeneratingSetResources } from './../app/pages/assets/generating-set/generating-set-resources';
import { PowerSourceResources } from 'src/app/pages/assets/power-sources/power-source-resources';
import { MeterResources } from './../app/pages/assets/meters/meter-resources';
import { NbAccessControl } from "@nebular/security";
import { AuthResources } from "src/app/pages/auth/auth-resources";
import { ClientResources } from "src/app/pages/clients/client-resources";
import { ExceptionResources } from "src/app/pages/exceptions/exceptions-resources";
import { PagesResources } from "src/app/pages/pages-resources";
import { UsersResources } from "src/app/pages/users/users-resources";
import { LoadPointResources } from 'src/app/pages/assets/load-points/load-point-resources';
import { LoadPointAnalyticsResources } from 'src/app/pages/analytics/load-point-analytics/load-point-analytics-resources';

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
                PagesResources.PowerStationsView,

                //View Generating Set
                PagesResources.GeneratingSetView,

                //View Tariff 
                PagesResources.TariffView,

                //View Service Band
                PagesResources.ServiceBandView,

                //View Power Station performance
                PagesResources.PowerSourceAnalyticsView,

                //View generating unit performance
                PagesResources.GeneratingSetAnalyticsView,
                //View Load Point  performance
                PagesResources.LoadPointAnalyticsView,
                LoadPointAnalyticsResources.SummaryView,
                LoadPointAnalyticsResources.ExpandedView,
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

                MeterResources.CreateMeter,

                LoadPointResources.CreateLoadPoint,

                GeneratingSetResources.CreateGeneratingSet,
                PowerSourceResources.CreatePowerSource,

                ServiceBandResources.CreateServiceBand,
                TariffResources.CreateTariff
            ],
            update: [
                UsersResources.UpdateUsers,
                UsersResources.UpdateClientUser,

                MeterResources.UpdateMeter,

                LoadPointResources.UpdateLoadPoint,

                GeneratingSetResources.UpdateGeneratingSet,
                PowerSourceResources.UpdatePowerSource,

                ServiceBandResources.UpdateServiceBand,
                TariffResources.UpdateTariff
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

                MeterResources.ViewClientColumn,
                LoadPointResources.ViewClientColumn,
                GeneratingSetResources.ViewClientColumn,
                PowerSourceResources.ViewPowerSourceColumn,

                TariffResources.ViewClientColumn,
                ServiceBandResources.ViewClientColumn

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
            ],
            update: [
                UsersResources.UpdateUsers,
                UsersResources.UpdateVggUser,
                UsersResources.UpdateClientAdmin,

                ClientResources.UpdateClient,
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