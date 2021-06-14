import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthHEaderInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let cloneRequest: any;
        if (
            request.url != `${environment.base_user}/user/register` ||
            request.url != `${environment.base_user}/user/login`
        ) {
            cloneRequest = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    'auth_token': window.localStorage.getItem('token')
                }
            })
        }
        else {
            cloneRequest = request
        }

        return next.handle(cloneRequest)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    // let errorMsg = '';
                    // if (error.error instanceof ErrorEvent) {
                    //     console.log('this is client side error');
                    //     errorMsg = `Error: ${error.error.message}`;
                    // }
                    // else {
                    //     console.log('this is server side error');
                    //     errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                    // }
                    // console.log(errorMsg);
                    return throwError(error);
                })
            )
    }
}