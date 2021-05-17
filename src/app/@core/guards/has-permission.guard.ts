import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ExceptionPermissionID, ExceptionPermissions } from 'src/app/pages/exceptions/exceptions-permissions';
import { PermissionService } from '../utils/permission.service';

@Injectable({
  providedIn: 'root'
})
export class HasPermissionGuard implements CanActivate, CanActivateChild {

  constructor(
    private permissionService: PermissionService,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const hasAccess = this.permissionService.canRead(state.url);
    if (hasAccess) {
      return true;
    } else {
      this.router.navigateByUrl(ExceptionPermissions.get(ExceptionPermissionID.Unauthorised)?.route as string)
      return false;
    }
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(route, state)
  }

}
