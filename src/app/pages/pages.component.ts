import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { PermissionService } from '../@core/utils/permission.service';
import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  menu = MENU_ITEMS;

  constructor(private permissionService: PermissionService) { }

  ngOnInit() {
    this.setMenuPermissions(this.menu);
  }

  setMenuPermissions(menu: NbMenuItem[]) {
    for (let m of menu) {
      if (!m.link) {
        if (m.children?.length) {
          this.setMenuPermissions(m.children);
        }
        if (m.children?.filter(c => !c.hidden).length) {
          m.hidden = false;
        } else {
          m.hidden = true;
        }
        if (m.group) {
          m.hidden = false;
        }
      } else if (this.permissionService.canRead(m.link)) {
        m.hidden = false;
      } else {
        m.hidden = true;
      }
    };

  }
}
