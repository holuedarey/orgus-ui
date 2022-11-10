import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as SecureLS from 'secure-ls';
import { AuthResources } from 'src/app/pages/auth/auth-resources';
import { environment } from 'src/environments/environment';
import { AccessControlContract } from '../data-contracts/access-control-contract';
import { HasAccess } from '../decorators/has-access.decorator';
import { LoginDto } from '../dtos/login.dto';
import { ResponseDto } from '../dtos/response-dto';
import { UpdatePasswordDto } from '../dtos/update-password.dto';
import { LocalStorageKey } from '../enums/local-storage-key.enum';
import { PermissionEnum } from '../enums/permission.enum';
import { UserModel } from '../models/user.model';
import { PermissionService } from '../utils/permission.service';
import { TokenService } from '../utils/token.service';
const ls = new SecureLS({ encodingType: 'aes' });


@Injectable({
  providedIn: 'root'
})
export class AuthService implements AccessControlContract {

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    public permissionService: PermissionService
  ) { 

  }

  // @HasAccess(PermissionEnum.View, AuthResources.UpdatePasswordView)
  updatePassword(passwords: any): Observable<ResponseDto<any>> {
    const jwtPayload = this.tokenService.getPayload();

    const apiEndpoint = 'auth/change-password';
    const passwordDto: UpdatePasswordDto = {
      email:ls.get(LocalStorageKey.JWT.toString()).payload['email'],
      password: passwords.newPassword,
      password_confirmation:passwords.newPassword,
      pin: passwords.pin,
    };
    return this.httpClient.post<ResponseDto<any>>(
      `${environment.apiUrl}/${apiEndpoint}`,
      passwordDto);
  }

  resetTokenPin(): Observable<ResponseDto<any>> {
    const jwtPayload  = this.tokenService.getPayload();
    console.log(jwtPayload.sub)
    const apiEndpoint = 'auth/send-reset-code';
    const passwordDto: any = {
      email: ls.get(LocalStorageKey.JWT.toString()).payload['email']
    };
    return this.httpClient.post<ResponseDto<any>>(
      `${environment.apiUrl}/${apiEndpoint}`,
      passwordDto);
  }

  resetPassword(passwords: any): Observable<ResponseDto<any>> {
    const apiEndpoint = 'auth/resetPassword';
    return this.httpClient.post<ResponseDto<any>>(
      `${environment.apiUrl}/${apiEndpoint}`,
      passwords);
  }

  newPassword(passwords: any): Observable<ResponseDto<any>> {
    const apiEndpoint = 'auth/newPassword';
    return this.httpClient.post<ResponseDto<any>>(
      `${environment.apiUrl}/${apiEndpoint}`,
      passwords);
  }

  requestPassword(emailDto: any): Observable<ResponseDto<any>> {
    const apiEndpoint = 'auth/forgotPassword';
    return this.httpClient.post<ResponseDto<any>>(
      `${environment.apiUrl}/${apiEndpoint}`,
      emailDto);
  }

  authenticate(loginDto: LoginDto): Observable<ResponseDto<any>> {
    const apiEndpoint = 'auth/get-token';
    return this.httpClient.post<ResponseDto<any>>(
      `${environment.apiUrl}/${apiEndpoint}`,
      loginDto);
  }

  getAuthenticatedUser(): any | null {
    const jwtPayload = this.tokenService.getPayload();
    try {
      return jwtPayload
    } catch (error) {
      return null
    }
  }

}
