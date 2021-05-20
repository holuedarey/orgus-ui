import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginDto } from '../dtos/login.dto';
import { ResponseDto } from '../dtos/response-dto';
import { UpdatePasswordDto } from '../dtos/update-password.dto';
import { UserModel } from '../models/user.model';
import { TokenService } from '../utils/token.service';


@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  updatePassword(passwords: any): Observable<ResponseDto<any>> {
    const user = this.tokenService.getPayload();

    const apiEndpoint = 'auth/changePassword';
    const passwordDto: UpdatePasswordDto = {
      oldPassword: passwords.oldPassword,
      newPassword: passwords.newPassword,
      email: (JSON.parse(user.sub) as UserModel).email
    };
    return this.httpClient.post<ResponseDto<any>>(
      `${environment.apiUrl}/${apiEndpoint}`,
      passwordDto);
  }

  resetPassword(passwords: any): Observable<ResponseDto<any>> {
    const apiEndpoint = 'auth/resetNewPassword';
    return this.httpClient.post<ResponseDto<any>>(
      `${environment.apiUrl}/${apiEndpoint}`,
      passwords);
  }

  requestPassword(emailDto: any): Observable<ResponseDto<any>> {
    const apiEndpoint = 'auth/resetPasswordEmail';
    return this.httpClient.post<ResponseDto<any>>(
      `${environment.apiUrl}/${apiEndpoint}`,
      emailDto);
  }

  authenticate(loginDto: LoginDto): Observable<ResponseDto<any>> {
    const apiEndpoint = 'auth/login';
    return this.httpClient.post<ResponseDto<any>>(
      `${environment.apiUrl}/${apiEndpoint}`,
      loginDto);
  }

}
