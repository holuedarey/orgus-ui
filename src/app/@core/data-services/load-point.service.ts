import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadPointResources } from 'src/app/pages/assets/load-points/load-point-resources';
import { environment } from 'src/environments/environment';
import { AccessControlContract } from '../data-contracts/access-control-contract';
import { HasAccess } from '../decorators/has-access.decorator';
import { ListDto } from '../dtos/list.dto';
import { LoadPointDto } from '../dtos/load-point.dto';
import { PostLoadPointDto } from '../dtos/post-load-point.dto';
import { ResponseDto } from '../dtos/response-dto';
import { UpdateLoadPointDto } from '../dtos/update-load-point.dto';
import { PermissionEnum } from '../enums/permission.enum';
import { PermissionService } from '../utils/permission.service';

@Injectable({
  providedIn: 'root'
})
export class LoadPointService implements AccessControlContract {

  constructor(
    private httpClient: HttpClient,
    public permissionService: PermissionService
  ) { }

  getLoadPoints(filter: any = { page: 1, size: environment.paginationLength }): Observable<ResponseDto<ListDto<LoadPointDto>>> {
    const apiEndpoint = 'loadPoints';
    let params = new HttpParams()
    for (const key in filter) {
      params = params.set(key, filter[key])
    }
    return this.httpClient.get<ResponseDto<ListDto<LoadPointDto>>>(`${environment.apiUrl}/${apiEndpoint}`, { params });
  }

  @HasAccess(PermissionEnum.Create, LoadPointResources.CreateLoadPoint)
  postLoadPoint(loadPoint: PostLoadPointDto): Observable<ResponseDto<LoadPointDto>> {
    const apiEndpoint = 'loadPoints';
    return this.httpClient.post<ResponseDto<LoadPointDto>>(`${environment.apiUrl}/${apiEndpoint}`, loadPoint);
  }

  @HasAccess(PermissionEnum.Update, LoadPointResources.UpdateLoadPoint)
  updateLoadPoint(loadPoint: UpdateLoadPointDto): Observable<ResponseDto<any>> {
    const apiEndpoint = `loadPoints/${loadPoint.id}`;
    return this.httpClient.put<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, loadPoint);
  }

  @HasAccess(PermissionEnum.Update, LoadPointResources.UpdateLoadPoint)
  enableLoadPoint(id: string): Observable<ResponseDto<any>> {
    const apiEndpoint = `loadPoints/enable/${id}`;
    return this.httpClient.put<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, null);
  }

  @HasAccess(PermissionEnum.Update, LoadPointResources.UpdateLoadPoint)
  disableLoadPoint(id: string): Observable<ResponseDto<any>> {
    const apiEndpoint = `loadPoints/disable/${id}`;
    return this.httpClient.put<ResponseDto<any>>(`${environment.apiUrl}/${apiEndpoint}`, null);
  }

}
