import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from './../dtos/response-dto';
import { environment } from './../../../environments/environment';
import { AppRoleDto } from './../dtos/role.dto';
import { Observable } from 'rxjs';
import { ListDto } from '../dtos/list.dto';
import { ClientDto } from '../dtos/client.dto';


@Injectable({
    providedIn: 'root'
})
export class ClientService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getClients(filter: any = { page: 1, size: environment.paginationLength }): Observable<ResponseDto<ListDto<ClientDto>>> {
        const apiEndpoint = 'clients';
        return this.httpClient.get<ResponseDto<ListDto<ClientDto>>>(`${environment.apiUrl}/${apiEndpoint}`);
    }
}