import { AccessControl } from "./access-control-config";

const environments = [
  {
    production: true,
    appUrl: 'https://argus-web.test.vggdev.com',
    apiUrl: 'http://localhost:3003',
    apiDomain: 'argusapp-api.test.vggdev.com',
    googleMapKey: 'AIzaSyDnwVXdPAfWb3f2OwfsimrxuLIPhHtYZcc',
    accessControlConfig: AccessControl[0]
  },
];

export const environment = environments.find(e => window.location.origin === e.appUrl) ?? environments[0];
