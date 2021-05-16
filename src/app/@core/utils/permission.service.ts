import { Injectable } from '@angular/core';
import { NbAccessChecker, NbAclService } from '@nebular/security';
import { of } from 'rxjs';
import { GlobalPermissions } from 'src/app/app-permissions';
import { RoleProvider } from './role-provider.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(
    private accessChecker: NbAclService,
    private roleProvider: RoleProvider
  ) { }

  canCreate(route: string): boolean {
    const role = this.roleProvider.getRoleSync();
    const permission = Array.from(GlobalPermissions.entries())
      .find(p => p[1].route === route)?.[0];
    if (permission) {
      return this.accessChecker.can(role, 'create', permission);
    } else {
      return false;
    }
  }

  canRead(route: string): boolean {
    const role = this.roleProvider.getRoleSync();
    const permission = Array.from(GlobalPermissions.entries())
      .find(p => p[1].route === route)?.[0];
    if (permission) {
      return this.accessChecker.can(role, 'read', permission);
    } else {
      return false;
    }
  }

  canUpdate(route: string): boolean {
    const role = this.roleProvider.getRoleSync();
    const permission = Array.from(GlobalPermissions.entries())
      .find(p => p[1].route === route)?.[0];
    if (permission) {
      return this.accessChecker.can(role, 'update', permission);
    } else {
      return false;
    }
  }

  canDelete(route: string): boolean {
    const role = this.roleProvider.getRoleSync();
    const permission = Array.from(GlobalPermissions.entries())
      .find(p => p[1].route === route)?.[0];
    if (permission) {
      return this.accessChecker.can(role, 'delete', permission);
    } else {
      return false;
    }
  }
}
