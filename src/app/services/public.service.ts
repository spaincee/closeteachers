import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  baseUrl: string = 'https://api-teacher-app.up.railway.app/api/public/teachers';
  constructor(private httpClient: HttpClient) { }

  
  getAll(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`))
  }

  //Eoliminar estos y poner los filtros publicos
  getById(pId: string): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}${pId}`))
  }

  create(pUser: User): Promise<User> {
    return lastValueFrom(this.httpClient.post<User>(this.baseUrl, pUser))
  }

  update(pUser: User): Promise<User> {
    return lastValueFrom(this.httpClient.put<User>(`${this.baseUrl}${pUser.id_user}`, pUser))
  }

  delete(pId: string): Promise<any> {
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}${pId}`))
  }

}
