import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from 'src/app/@core/utils';
import { TokenService } from 'src/app/@core/utils/token.service';
import { PagesResources, PagesResourcesNavMap } from '../pages-resources';
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
      this.router.navigateByUrl(PagesResourcesNavMap.get(PagesResources.AgentDetailsView)?.route as string);
    } else if (!this.loginUser.documentsUpload) {
      this.router.navigateByUrl(PagesResourcesNavMap.get(PagesResources.AgentDocumentsView)?.route as string);
    }
  }


}
