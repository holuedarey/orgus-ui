import { ResourceNavModel } from "./@core/models/resource-nav.model";

export enum AppResources {
    LandingView = 'app:landing-view',
    AgentView = 'app:agent-view',
    AgentOtpView = 'app:agent-otp-view',
    AgentDetailsView = 'app:agent-details-view',
    AgentDocumentsView = 'app:agent-documents-view',
    AuthView = 'app:auth-view',
    AppView = 'app:app-view',
    ErrorView = 'app:error-view'
}

export const AppResourcesNavMap = new Map<AppResources, ResourceNavModel>([
    [
        AppResources.LandingView,
        {
            route: '/',
            path: ''
        }
    ],
    [
        AppResources.AgentView,
        {
            route: '/agent',
            path: 'agent'
        }
    ],
    [
        AppResources.AgentOtpView,
        {
            route: '/agent-otp',
            path: 'agent-otp'
        }
    ],
    [
        AppResources.AgentDetailsView,
        {
            route: '/agent-details',
            path: 'agent-details'
        }
    ],
    [
        AppResources.AgentDocumentsView,
        {
            route: '/agent-documents',
            path: 'agent-documents'
        }
    ],
    [
        AppResources.AuthView,
        {
            route: '/auth',
            path: 'auth'
        }
    ],
    [
        AppResources.AppView,
        {
            route: '/app',
            path: 'app'
        }
    ],
    [
        AppResources.ErrorView,
        {
            route: '/error',
            path: 'error'
        }
    ],
]);
