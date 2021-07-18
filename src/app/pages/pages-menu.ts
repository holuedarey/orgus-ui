import { NbMenuItem } from '@nebular/theme';
import { GlobalResources } from '../@core/maps/global-resources';
import { PagesResources } from './pages-resources';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home',
    link: GlobalResources.get(PagesResources.DashboardView)?.route,
    home: true,
  },
  {
    title: 'MODULES',
    group: true,
  },
  {
    title: 'Users',
    link: GlobalResources.get(PagesResources.UsersView)?.route,
    icon: 'people-outline',
  },
  {
    title: 'Clients',
    link: GlobalResources.get(PagesResources.ClientsView)?.route,
    icon: 'clipboard-outline',
  },
  {
    title: 'Assets',
    icon: 'briefcase-outline',
    children: [
      {
        title: 'Meters',
        link: GlobalResources.get(PagesResources.MetersView)?.route,
        icon: 'speaker-outline',
      },
      {
        title: 'Load Points',
        link: GlobalResources.get(PagesResources.LoadPointsView)?.route,
        icon: 'code-download-outline',
      },
      {
        title: 'Power Sources',
        link: GlobalResources.get(PagesResources.PowerSourcesView)?.route,
        icon: 'wifi-outline',
      },
    ]
  },

];
