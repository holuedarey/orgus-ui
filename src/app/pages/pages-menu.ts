import { NbMenuItem } from '@nebular/theme';
import { GlobalResources } from '../@core/maps/global-resources';
import { LoadPointAnalyticsResources } from './analytics/load-point-analytics/load-point-analytics-resources';
import { PagesResources } from './pages-resources';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home',
    link: GlobalResources.get(PagesResources.DashboardView)?.route,
    home: true,
  },
  // {
  //   title: 'MODULES',
  //   group: true,
  // },
  // {
  //   title: 'Users',
  //   link: GlobalResources.get(PagesResources.UsersView)?.route,
  //   icon: 'people-outline',
  // },

  // {
  //   title: 'Analytics',
  //   icon: 'briefcase-outline',
  //   children: [
  //     {
  //       title: 'Load Point',
  //       link: GlobalResources.get(LoadPointAnalyticsResources.SummaryView)?.route,
  //       icon: 'speaker-outline',
  //     },
  //   ]
  // },


];
