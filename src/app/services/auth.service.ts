import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = 'https://api-teacher-app.up.railway.app/api/auth';

  constructor(private httpClient: HttpClient) { }


  register(data: User): Promise<any> {
    return lastValueFrom(this.httpClient.post<User>(`${this.baseUrl}/register`, data));
  }

  login(data: User): Promise<any> {
    return lastValueFrom(this.httpClient.post<User>(`${this.baseUrl}/login`, data));
  }
}
