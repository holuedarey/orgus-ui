import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbTokenService } from '@nebular/auth';
import { SeoService } from 'src/app/@core/utils';
import { TokenService } from 'src/app/@core/utils/token.service';
import { TableFilterComponent } from 'src/app/@tables/table-filter/table-filter.component';
import { TableTagComponent } from 'src/app/@tables/table-tag/table-tag.component';
import { TableService } from 'src/app/@tables/table.service';
import { AppResources, AppResourcesNavMap } from 'src/app/app-resources';
// import * as XlsxPopulate from 'xlsx-populate/browser/xlsx-populate';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  draggable = true;
  loginUser: any;
  constructor(
    private seo: SeoService,
    private tokenService: TokenService,
    protected router: Router,
  ) { }

  async ngOnInit() {
    this.seo.setSeoData('Dashboard', 'Logged in user page analytics');
    this.loginUser = this.tokenService.getPayload();
    console.log("loginUser", this.loginUser)
  }

  goToOnboarding() {

    if (!this.loginUser.userDetails) {
      this.router.navigateByUrl(AppResourcesNavMap.get(AppResources.AgentDetailsView)?.route as string);
    } else if (!this.loginUser.documentsUpload) {
      this.router.navigateByUrl(AppResourcesNavMap.get(AppResources.AgentDocumentsView)?.route as string);
    }
  }


}
