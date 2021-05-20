import { AccessControl } from "./access-control-config";

const environments = [
  {
    production: true,
    appUrl: 'https://argusapp-web.test.vggdev.com',
    apiUrl: 'https://argusgateway-api.test.vggdev.com',
    apiDomain: 'argusgateway-api.test.vggdev.com',
    googleMapKey: 'AIzaSyDnwVXdPAfWb3f2OwfsimrxuLIPhHtYZcc',
    accessControlConfig: AccessControl[0]
  },
  {
    production: true,
    appUrl: 'https://argusapp.staging.vggdev.com',
    apiUrl: 'https://argusgateway-api.staging.vggdev.com',
    apiDomain: 'argusgateway-api.staging.vggdev.com',
    googleMapKey: 'AIzaSyDnwVXdPAfWb3f2OwfsimrxuLIPhHtYZcc',
    accessControlConfig: AccessControl[0]
  },
];

export const environment = environments.find(e => window.location.origin === e.appUrl) ?? environments[0];
