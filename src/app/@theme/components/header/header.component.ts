import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { BaseComponent } from '../../../shared/base/base.component';
import { ActivatedRoute } from '@angular/router';
import { CurrentUser } from '../../../shared/models/currentUser.model';
import { Utf8Decode } from '../../../shared/functions';
import { StoreKeys } from '../../../shared/statics/StoreKeys';
import { StoreService } from '../../../@core/services';
import { PageLinks } from '../../../shared/statics/page-links';
import { UsersService } from '../../../../app/modules/panel/account/services/users.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  providers: [LayoutService]
})
export class HeaderComponent extends BaseComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  showChangePassword: boolean = false;
  user: any = {};
  currenUser: CurrentUser = new CurrentUser();

  themes = [
    {
      value: 'default',
      name: 'روشن',
    },
    {
      value: 'dark',
      name: 'تیره',
    },
    {
      value: 'cosmic',
      name: 'کیهانی',
    },
  ];

  currentTheme = 'default';

  userMenu = [
    { key: 'profile', title: 'پروفایل' },
    { key: 'changePassword', title: 'تغییر رمز عبور' },
    { key: 'logout', title: 'خروج' }
  ];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private authService: AuthService,
    private store: StoreService,
    private userService: UsersService,
    route: ActivatedRoute) {
    super(route);
  }

  ngOnInit() {
    this.getUserAvatar();
    this.getCurrentUser();
    this.getUserData();
    this.onMenuClick();
  }

  getUserData() {
    let name = this.store.localGetItem(StoreKeys.USER_INFO);
    if (!name) {
      name = `${this.currenUser.Name} ${this.currenUser.Family}`;
    }
    this.user.name = name;
    this.currentTheme = this.themeService.currentTheme;

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  onMenuClick() {
    this.menuService.onItemClick().subscribe((result: any) => {
      if (result.item.key === 'logout') {
        this.setLoading(true);
        this.authService.logOut().subscribe(result => {
          if (result.success) {
            this.store.localRemoveItem(StoreKeys.TOKEN_NAME);
            this.store.localRemoveItem(StoreKeys.TOKEN_EXPIRE);
            this.store.localRemoveItem(StoreKeys.USER_AVATAR);
            this.store.localRemoveItem(StoreKeys.USER_INFO);
            let url = `${PageLinks.Auth}/${PageLinks.Login}`;

            this.router.navigateByUrl(url);
          }
          else {
            this.setLoading(false);
            this.showErrorMessage(result.message)
          }
        });
      }

      if (result.item.key === 'changePassword') {
        this.showChangePassword = true;
      }

      if (result.item.key === 'profile') {
        this.navigateTo([`/${PageLinks.Panel}/${PageLinks.Profile}`])
      }

    })
  }

  getCurrentUser() {
    this.currenUser = this.authService.getCurrentUser();
    this.currenUser.Name = Utf8Decode(this.currenUser?.Name!);
    this.currenUser.Family = Utf8Decode(this.currenUser?.Family!);
  }

  getUserAvatar() {
    let avatar = 'data:image/jpg;base64,'
    let localUserAvatar = this.store.localGetItem(StoreKeys.USER_AVATAR);
    if (localUserAvatar) {
      this.user.picture = avatar + localUserAvatar;

    } else {
      this.userService.getUserAvatar().subscribe(result => {
        if (result.success) {
          this.user.picture = avatar + result.data;

          this.store.localSetItem(StoreKeys.USER_AVATAR, result.data)
        }
      })
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  onHideChangePassword($event) {
    this.showChangePassword = $event;
  }
}
