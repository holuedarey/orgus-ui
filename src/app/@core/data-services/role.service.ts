import { Injectable } from '@angular/core';
import { ResponseDto } from './../dtos/response-dto';
import { environment } from './../../../environments/environment';
import { RoleDto } from './../dtos/role.dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoleResponseDto } from '../dtos/role-response.dto';


@Injectable({
    providedIn: 'root'
})
export class RoleService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getRoles(): Observable<ResponseDto<RoleDto[]>> {
        const apiEndpoint = 'Roles';
        return this.httpClient.get<ResponseDto<RoleDto[]>>(`${environment.apiUrl}/${apiEndpoint}`);
    }
}