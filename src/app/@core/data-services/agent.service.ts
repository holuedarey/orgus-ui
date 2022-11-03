import { PermissionService } from '../utils/permission.service';
import { ClientResources } from '../../pages/clients/client-resources';
import { PostClientDto } from '../dtos/post-client.dto';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseDto } from '../dtos/response-dto';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ListDto } from '../dtos/list.dto';
import { ClientDto } from '../dtos/client.dto';
import { UpdateClientDto } from '../dtos/update-client.dto';
import { PermissionEnum } from '../enums/permission.enum';
import { AccessControlContract } from '../data-contracts/access-control-contract';
import { PostAgentDto } from '../dtos/post-agent.dto';
import { PostAgentOtpDto } from '../dtos/post-agent-otp.dto';
import { PostAgentTokenDto } from '../dtos/post-agent-token-resend.dto';
import { PostAgentDetailsDto } from '../dtos/post-agent-details.dto';


@Injectable({
    providedIn: 'root'
})
export class AgentService {

    constructor(
        private httpClient: HttpClient,
    ) { }

    getAgents(filter: any = { page: 1, size: environment.paginationLength }): Observable<ResponseDto<ListDto<ClientDto>>> {
        const apiEndpoint = 'agents';
        let params = new HttpParams()
        for (const key in filter) {
            params = params.set(key, filter[key])
        }
        return this.httpClient.get<ResponseDto<ListDto<ClientDto>>>(`${environment.apiUrl}/${apiEndpoint}`, { params });
    }

    postAgent(agents: PostAgentDto): Observable<ResponseDto<any>> {
        const apiEndpoint = 'auth/sign-up';
        console.log(`${environment.apiUrl}/${apiEndpoint}`);
        return this.httpClient.post<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, agents);
    }

    postVerifyEmail(agents: PostAgentOtpDto): Observable<ResponseDto<any>> {
        const apiEndpoint = 'auth/verify-email';
        return this.httpClient.post<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, agents);
    }

    postResendEmail(agents: PostAgentTokenDto): Observable<ResponseDto<any>> {
        const apiEndpoint = 'auth/resent-email-verification-pin';
        return this.httpClient.post<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, agents);
    }

    postAgentDetails(agents: PostAgentDetailsDto): Observable<ResponseDto<any>> {
        const apiEndpoint = 'auth/update-user-details';
        return this.httpClient.post<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, agents);
    }
    
   
    postAgentDocument(agentDoc: any): Observable<ResponseDto<any>> {
        const apiEndpoint = `auth/upload-kyc-documents`;
        return this.httpClient.post<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, agentDoc);
    }
}