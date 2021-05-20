import { Injectable } from '@angular/core';
import { NbRoleProvider } from '@nebular/security';
import { Observable, of } from 'rxjs';
import { UserModel } from '../models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class RoleProvider implements NbRoleProvider {

  constructor(private tokenService: TokenService) { }

  getRole(): Observable<string> {
    return of(this.getRoleSync());
  }

  getRoleSync() {
    const payload = this.tokenService.getPayload();
    if (payload) {
      try {
        return (JSON.parse(payload.sub) as UserModel).ssoRole
      } catch (error) {
        return 'guest';
      }
    }
    return 'guest';
  }
}
