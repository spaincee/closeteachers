import { HttpClient, HttpParams } from '@angular/common/http';
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

  getTeacherInfo(id: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/${id}`));
  }

  getTeachersbySubject(subject: string): Promise<User[]> {
    let params = new HttpParams()
    .set('subject', subject);

    return lastValueFrom(this.httpClient.get<User[]>(`${this.baseUrl}/filterBySubject`, {params}));
  }

  getTeachersbyPrice(min_price: number, max_price: number): Promise<User[]> {
    let params = new HttpParams()
    .set('min_price', min_price)
    .set('max_price', max_price);

    return lastValueFrom(this.httpClient.get<User[]>(`${this.baseUrl}/filterByPrice`, {params}));
  }

  getTeachersbyExperience(experience: number): Promise<User[]> {
    let params = new HttpParams()
    .set('experience', experience);

    return lastValueFrom(this.httpClient.get<User[]>(`${this.baseUrl}/filterByExperience`, {params}));
  }

  getTeachersbyCombined(subject: string, min_price: number, max_price: number, experience: number): Promise<User[]> {
    let params = new HttpParams()
    .set('subject', subject)
    .set('min_price', min_price)
    .set('max_price', max_price)
    .set('experience', experience);

    return lastValueFrom(this.httpClient.get<User[]>(`${this.baseUrl}/filterCombined`, {params}));
  }

  // //Eoliminar estos y poner los filtros publicos
  // getById(pId: string): Promise<any> {
  //   return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}${pId}`))
  // }

  // create(pUser: User): Promise<User> {
  //   return lastValueFrom(this.httpClient.post<User>(this.baseUrl, pUser))
  // }

  // update(pUser: User): Promise<User> {
  //   return lastValueFrom(this.httpClient.put<User>(`${this.baseUrl}${pUser.id_user}`, pUser))
  // }

  // delete(pId: string): Promise<any> {
  //   return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}${pId}`))
  // }

}
