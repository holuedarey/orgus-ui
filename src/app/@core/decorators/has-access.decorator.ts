import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { of, throwError } from "rxjs";
import { ResponseDto } from "../dtos/response-dto";
import { PermissionService } from "../utils/permission.service";

export function HasAccess(permission: string, resource: string) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor | any) => {

    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any) {
      const hasAccess = (this.permissionService as PermissionService).canAccessByResource(permission, resource)
      if (hasAccess) {
        const result = originalMethod.apply(this, args);
        return result;
      } else {
        return of(new HttpResponse<ResponseDto<any>>({
          body: {
            message: 'You are unauthorised to perform this action',
            status: false
          }
        }));
      }
    };
    return descriptor;
  };

}