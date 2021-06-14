import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthHEaderInterceptor } from "./auth-interceptor";

export const httpInterceptors = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHEaderInterceptor, multi: true }
]