import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/@core/utils';
import { TableFilterComponent } from 'src/app/@tables/table-filter/table-filter.component';
import { TableTagComponent } from 'src/app/@tables/table-tag/table-tag.component';
import { TableService } from 'src/app/@tables/table.service';
// import * as XlsxPopulate from 'xlsx-populate/browser/xlsx-populate';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  items = [
    'chart-i',
    'chart-ii',
    'chart-ii',
    'chart-i',
    'chart-ii',
    'chart-i',
    'chart-i',
    'chart-ii',
    'chart-i',
  ];

  draggable = true;

  data = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      link: '<a href="http://www.google.com">Google</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: this.tableService.generateTagData('Completed', 'warning'),
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: '{"status": "success", "value":"Completed"}',
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: this.tableService.generateTagData('Completed', 'warning'),
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: this.tableService.generateTagData('Completed', 'warning'),
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: this.tableService.generateTagData('Completed', 'warning'),
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: this.tableService.generateTagData('Completed', 'warning'),
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: this.tableService.generateTagData('Completed', 'warning'),
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: this.tableService.generateTagData('Completed', 'warning'),
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: '{"status": "danger", "value":"Completed"}',
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: '{"status": "danger", "value":"Completed"}',
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      username: 'Samantha',
      link: '<a href="https://github.com/akveo/ng2-smart-table">Ng2 smart table</a>',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      username: 'Karianne',
      link: '<a href="https://github.com/akveo/blur-admin">Blur Admin</a>',
    },
  ];

  columns = {
    id: {
      title: 'ID',
      type: 'custom',
      renderComponent: TableTagComponent,
      filter: {
        type: 'custom',
        component: TableFilterComponent
      }
    },
    name: {
      title: 'Full Name',
      filter: {
        type: 'custom',
        component: TableFilterComponent
      }
    },
    username: {
      title: 'User Name',
      type: 'custom',
      renderComponent: TableTagComponent,
      filter: {
        type: 'custom',
        component: TableFilterComponent
      }
    },
    link: {
      title: 'Link',
      filter: {
        type: 'custom',
        component: TableFilterComponent
      }
    }
  }

  constructor(
    private seo: SeoService,
    private tableService: TableService,
    // private xlsx: XlsxService
  ) { }

  requestData(d: any) {
    console.log(d)
  }


  async ngOnInit() {
    this.seo.setSeoData('Dashboard', 'Logged in user page analytics');
    this.testXlsx();
  }
  async testXlsx() {
    const data = [
      [7000, 'Hello'],
      [7000, 'I did this from Javascript'],
      [7000, 'WEB WORKER!!!'],
    ];
    // this.xlsx.generateReport(XlsxTemplateEnum.BasicReport, data, 'Something.xlsx');
  }



}
