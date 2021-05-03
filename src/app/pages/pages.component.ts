import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { concat, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  menu;

  constructor(public translateService: TranslateService) { }

  ngOnInit(): void {
    this.menu = concat(
      of([]),
      this.translateService.getTranslation(this.translateService.defaultLang)
        .pipe(map(translation => this.setTranslation([...MENU_ITEMS], translation))),
      this.translateSidebarOnLangChange(),
    );
  }

  setTranslation(data: any[], translations: any): any[] {
    data.forEach(d => {
      d.title = translations.SIDEBAR[d.translation] ?? d.title;
      if (d.children?.length) {
        d.children = this.setTranslation(d.children, translations);
      }
    });
    return data;
  }

  translateSidebarOnLangChange(): Observable<any> {
    return this.translateService.onLangChange.asObservable()
      .pipe(map(
        (lang) => {
          const menu = [...MENU_ITEMS];
          return this.setTranslation(menu, lang.translations);
        })
      );
  }

}
