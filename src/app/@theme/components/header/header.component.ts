import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { filter, map, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserService } from 'src/app/@core/data-services/users.service';
import { ServiceWorkerService } from 'src/app/@core/utils/service-worker.service';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly = false;
  autoToggleMenu = false;

  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    }
  ];

  currentTheme = 'default';

  userMenu = [
    { title: 'Profile' },
    { title: 'Log out' }
  ];

  canInstall$: BehaviorSubject<boolean>;

  constructor(
    private sw: ServiceWorkerService,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService) {
    this.canInstall$ = this.sw.readyForInstall;
  }

  ngOnInit(): void {
    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const { xl, lg } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < lg),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanL: boolean) => this.autoToggleMenu = isLessThanL);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    this.menuService.onItemClick().pipe(
      filter(({ tag }) => (this.autoToggleMenu && tag !== 'user-menu')),
      takeUntil(this.destroy$),
    ).subscribe(() => this.toggleSidebar());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string): void {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome(): boolean {
    this.menuService.navigateHome();
    return false;
  }

  installPwa() {
    this.sw.installPwa();
  }

  fullscreenLayout(): void {
    document.getElementById('layoutColumn')?.requestFullscreen();
  }
}
