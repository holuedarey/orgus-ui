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

];
