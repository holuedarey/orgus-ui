import { Injectable, Injector } from "@angular/core";
import {
    HttpErrorResponse,
    HttpHandler,
    HttpHeaderResponse,
    HttpInterceptor,
    HttpProgressEvent,
    HttpRequest,
    HttpResponse,
    HttpSentEvent,
    HttpUserEvent,
    HttpEvent
} from "@angular/common/http";
import { BehaviorSubject, Observable, throwError, from } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Constants } from "../common/constant";
import { StorageService } from "./storage.service";
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { NbAuthService } from "@nebular/auth";
import { TokenService } from "../utils/token.service";
import * as SecureLS from "secure-ls";
import { LocalStorageKey } from "../enums/local-storage-key.enum";
const ls = new SecureLS({ encodingType: 'aes' });

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {

    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
    loaderToShow: any;
    constructor(private storageService: TokenService, public auth: NbAuthService, public router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token = ls.get(LocalStorageKey.JWT.toString()).token as string;
        console.log("token service :", token);
        let state = this.auth.isAuthenticated();
        if (!state) {
            this.router.navigate(['/login']);
        }
        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }

        console.log("file content", (request.body instanceof File))
        if (!request.headers.has('Content-Type') && !(request.body instanceof File) ) {
            console.log("got here ")
           
        }else{
            console.log("file got here ")
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
            request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        }

       

        //start loading page with preloader
        // this.showLoader();
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // console.log('event--->>>', event);
                    //end loading page with preloader if successful
                    // this.hideLoader();
                    // this.errorDialogService.openDialog(event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                // console.log(error);
                let data = {};
                data = {
                    reason: error && error.error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                return throwError(error);
            }));
    }
}