import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbThemeService } from '@nebular/theme';
import { UserAuthService } from 'src/app/@core/data-services/user-auth.service';
import { LocalStorageKey } from 'src/app/@core/enums/local-storage-key.enum';
import { RoleMap } from 'src/app/@core/maps/role.map';
import { UserModel } from 'src/app/@core/models/user.model';
import { SecureLocalStorageService } from 'src/app/@core/utils/secure-local-storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  user: UserModel;
  roleMap = RoleMap;

  isDarkTheme: boolean;

  constructor(
    private userAuthService: UserAuthService,
    public dialogRef: NbDialogRef<SettingsComponent>,
    private themeService: NbThemeService,
    private storageService: SecureLocalStorageService,
  ) {
    this.user = this.userAuthService.getAuthenticatedUser() as UserModel
    this.isDarkTheme = (
      this.storageService.get<string>(LocalStorageKey.THEME.toString()) ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default')
    ) === 'dark';

  }

  close() {
    this.dialogRef.close();
  }

  
  onThemeChange(isDarkSelected: boolean): void {
    this.isDarkTheme = isDarkSelected;
    const theme = isDarkSelected ? 'dark' : 'default';
    this.themeService.changeTheme(theme);
    this.storageService.set<string>(LocalStorageKey.THEME.toString(), theme);
  }

}
