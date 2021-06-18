import { PermissionService } from './../utils/permission.service';
import { ClientResources } from './../../pages/clients/client-resources';
import { PostClientDto } from './../dtos/post-client.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from './../dtos/response-dto';
import { environment } from './../../../environments/environment';
import { HasAccess } from '../decorators/has-access.decorator';
import { Observable } from 'rxjs';
import { ListDto } from '../dtos/list.dto';
import { ClientDto } from '../dtos/client.dto';
import { UpdateClientDto } from '../dtos/update-client.dto';
import { PermissionEnum } from '../enums/permission.enum';


@Injectable({
    providedIn: 'root'
})
export class ClientService {

    constructor(
        private httpClient: HttpClient,
        public permissionService: PermissionService
    ) { }

    getClients(filter: any = { page: 1, size: environment.paginationLength }): Observable<ResponseDto<ListDto<ClientDto>>> {
        const apiEndpoint = 'clients';
        return this.httpClient.get<ResponseDto<ListDto<ClientDto>>>(`${environment.apiUrl}/${apiEndpoint}`);
    }

    //@HasAccess(PermissionEnum.Create, ClientResources.CreateClient)
    postClient(clients: PostClientDto): Observable<ResponseDto<any>> {
        const apiEndpoint = 'clients';
        return this.httpClient.post<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, clients);
      }

      //@HasAccess(PermissionEnum.Update, ClientResources.UpdateClient)
      updateClient(client: UpdateClientDto): Observable<ResponseDto<any>> {
        const apiEndpoint = `clients/${client.id}`;
        return this.httpClient.put<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, client);
      }
}