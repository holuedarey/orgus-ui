import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NbAccessChecker } from '@nebular/security';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HasPermissionGuard implements CanActivate {

  constructor(
    private accessChecker: NbAccessChecker
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      
    return true;
  }

}
