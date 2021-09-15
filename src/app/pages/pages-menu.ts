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
        title: 'Power Stations',
        link: GlobalResources.get(PagesResources.PowerStationsView)?.route,
        icon: 'wifi-outline',
      },
      {
        title: 'Generating Units',
        link: GlobalResources.get(PagesResources.GeneratingSetView)?.route,
        icon: 'options-outline',
      },
    ]
  },  
  {
    title: 'Tariff Management',
    link: GlobalResources.get(PagesResources.TariffView)?.route,
    icon: 'clipboard-outline'
  },
  {
    title: 'Analytics',
    icon: 'briefcase-outline',
    children: [
      {
        title: 'Power Station',
        link: GlobalResources.get(PagesResources.PowerSourceAnalyticsView)?.route,
        icon: 'speaker-outline',
      },
      {
        title: 'Load Point',
        link: GlobalResources.get(LoadPointAnalyticsResources.SummaryView)?.route,
        icon: 'speaker-outline',
      },
      {
        title: 'Generating Unit',
        link: GlobalResources.get(PagesResources.GeneratingSetAnalyticsView)?.route,
        icon: 'speaker-outline',
      },
    ]
  },


];
