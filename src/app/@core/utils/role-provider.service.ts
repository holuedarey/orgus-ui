import { Injectable } from '@angular/core';
import { NbRoleProvider } from '@nebular/security';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleProvider implements NbRoleProvider {

  constructor() { }

  getRole(): Observable<string> {
    return of(this.getRoleSync());
  }

  getRoleSync() {
    return 'user'
  }
}
