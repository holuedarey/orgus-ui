import { Injectable } from '@angular/core';
import { NbAclService } from '@nebular/security';
import { GlobalPermissions } from '../maps/global-permissions';
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
    return this.canAccessByRoute(route, 'create');
  }

  canRead(route: string): boolean {
    return this.canAccessByRoute(route, 'read');
  }

  canUpdate(route: string): boolean {
    return this.canAccessByRoute(route, 'update');
  }

  canDelete(route: string): boolean {
    return this.canAccessByRoute(route, 'delete');
  }

  private canAccessByRoute(route: string, permission: string): boolean {
    const role = this.roleProvider.getRoleSync();
    const resource = Array.from(GlobalPermissions.entries())
      .find(p => p[1].route === route)?.[0];
    if (resource) {
      return this.accessChecker.can(role, permission, resource);
    } else {
      return false;
    }
  }

  canAccessByResource(permission: string, resource: string): boolean {
    const role = this.roleProvider.getRoleSync();
    if (resource) {
      return this.accessChecker.can(role, permission, resource);
    } else {
      return false;
    }
  }
}
