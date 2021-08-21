import { Component, HostListener } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { environment } from 'src/environments/environment';
import { ServiceWorkerService } from './@core/utils/service-worker.service';
import { isMobile } from 'mobile-device-detect';
import { PagesResources, PagesResourcesNavMap } from './pages/pages-resources';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Argus';

  constructor(
    private sw: ServiceWorkerService,
    private toaster: NbToastrService,
  ) {
    console.log("data :: ", PagesResourcesNavMap.get(PagesResources.LoadPointManagementsView)?.path,);
    
    if (environment.production) {
      this.initServiceWorker();
    }
  }

  initServiceWorker(): void {
    this.sw.errorOccured
      .asObservable()
      .subscribe((stat) => {
        if (stat) {
          this.toaster.danger('Please reload/restart to avoid data loss', 'Application Error');
        }
      });

    this.sw.updateRequired
      .asObservable()
      .subscribe((stat) => {
        if (stat) {
          this.toaster.primary('A new version is available. Updating...', 'Application Update');
        }
      });
  }

  @HostListener(`window:beforeinstallprompt`, ['$event'])
  setInstallPrompt(e: any): void {
    if (!isMobile) {
      e.preventDefault();
    }
    this.sw.initInstallPrompt(e);
  }
}
