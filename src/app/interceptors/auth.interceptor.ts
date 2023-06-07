import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    
    
    const token = localStorage.getItem('token')!;
    // Verifica si el encabezado de autorización ya está presente en la solicitud
    if (!req.headers.has('authorization')) {
      // Agrega el encabezado de autorización solo si no está presente
      const authReq = req.clone({
        headers: req.headers.set('authorization', token)
      });
      return next.handle(authReq); 
    }
    

    return next.handle(req);
  }
}