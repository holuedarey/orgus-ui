import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadPointAnalyticsExpandedComponent } from './load-point-analytics-expanded/load-point-analytics-expanded.component';
import { LoadPointAnalyticsSummaryComponent } from './load-point-analytics-summary/load-point-analytics-summary.component';
import { LoadPointAnalyticsComponent } from './load-point-analytics.component';

const routes: Routes = [
  {
    path: '',
    component: LoadPointAnalyticsComponent,
    children: [
      {
        path: '',
        redirectTo: 'summary'
      },
      {
        path: 'summary',
        component: LoadPointAnalyticsSummaryComponent,
        data: { isSummary: true }
      },
      {
        path: 'expanded',
        component: LoadPointAnalyticsExpandedComponent,
        data: { isSummary: false }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadPointAnalyticsRoutingModule { }
