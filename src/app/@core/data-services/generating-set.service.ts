import { GeneratingSetResources } from './../../pages/assets/generating-set/generating-set-resources';
import { GeneratingSetDto } from './../dtos/generating-set.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccessControlContract } from '../data-contracts/access-control-contract';
import { HasAccess } from '../decorators/has-access.decorator';
import { ListDto } from '../dtos/list.dto';
import { ResponseDto } from '../dtos/response-dto';
import { PermissionEnum } from '../enums/permission.enum';
import { PermissionService } from '../utils/permission.service';
import { PostGeneratingSetDto } from '../dtos/post-generating-set.dto';
import { UpdateGeneratingSetDto } from '../dtos/update-generating-set.dto';

@Injectable({
  providedIn: 'root'
})
export class GeneratingSetsService implements AccessControlContract {

  constructor(
    private httpClient: HttpClient,
    public permissionService: PermissionService
  ) { }

  getGeneratingSets(filter: any = { page: 1, size: environment.paginationLength }): Observable<ResponseDto<ListDto<GeneratingSetDto>>> {
    const apiEndpoint = 'generatingSet';
    let params = new HttpParams()
    for (const key in filter) {
      params = params.set(key, filter[key])
    }
    return this.httpClient.get<ResponseDto<ListDto<GeneratingSetDto>>>(`${environment.apiUrl}/${apiEndpoint}`, { params });
  }

  @HasAccess(PermissionEnum.Create, GeneratingSetResources.CreateGeneratingSet)
  postGeneratingSet(generatingSets: PostGeneratingSetDto): Observable<ResponseDto<GeneratingSetDto>> {
    const apiEndpoint = 'generatingSet';
    return this.httpClient.post<ResponseDto<GeneratingSetDto>>(`${environment.apiUrl}/${apiEndpoint}`, generatingSets);
  }

  @HasAccess(PermissionEnum.Update, GeneratingSetResources.UpdateGeneratingSet)
  updateGeneratingSet(generatingSets: UpdateGeneratingSetDto): Observable<ResponseDto<any>> {
    const apiEndpoint = `generatingSet/${generatingSets.id}`;
    return this.httpClient.put<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, generatingSets);
  }

  @HasAccess(PermissionEnum.Update, GeneratingSetResources.UpdateGeneratingSet)
  enableGeneratingSet(id: string): Observable<ResponseDto<any>> {
    const apiEndpoint = `generatingSet/enable/${id}`;
    return this.httpClient.put<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, null);
  }

  @HasAccess(PermissionEnum.Update, GeneratingSetResources.UpdateGeneratingSet)
  disableGeneratingSet(id: string): Observable<ResponseDto<any>> {
    const apiEndpoint = `generatingSet/disable/${id}`;
    return this.httpClient.put<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, null);
  }

}
