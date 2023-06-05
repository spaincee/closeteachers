import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  baseUrl: string = 'https://api-teacher-app.up.railway.app/api/student/dashboard';

  constructor(private httpClient: HttpClient) { }


  getDashboardInfo(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`));
  }

  getMyTeacherInfo(id: number): Promise<User> {
    return lastValueFrom(this.httpClient.get<User>(`${this.baseUrl}/my_teacher/${id}`));
  }

  getTeachers(): Promise<User[]> {
    return lastValueFrom(this.httpClient.get<User[]>(`${this.baseUrl}/teachers`));
  }

  getTeachersbySubject(subject: string): Promise<User[]> {
    let params = new HttpParams()
    .set('subject', subject);

    return lastValueFrom(this.httpClient.get<User[]>(`${this.baseUrl}/teachers/filterBySubject`, {params}));
  }

  getTeachersbyPrice(min_price: number, max_price: number): Promise<User[]> {
    let params = new HttpParams()
    .set('min_price', min_price)
    .set('max_price', max_price);

    return lastValueFrom(this.httpClient.get<User[]>(`${this.baseUrl}/teachers/filterByPrice`, {params}));
  }

  getTeachersbyExperience(experience: number): Promise<User[]> {
    let params = new HttpParams()
    .set('experience', experience);

    return lastValueFrom(this.httpClient.get<User[]>(`${this.baseUrl}/teachers/filterByExperience`, {params}));
  }

  getTeachersbyCombined(subject: string, min_price: number, max_price: number, experience: number): Promise<User[]> {
    let params = new HttpParams()
    .set('subject', subject)
    .set('min_price', min_price)
    .set('max_price', max_price)
    .set('experience', experience);

    return lastValueFrom(this.httpClient.get<User[]>(`${this.baseUrl}/teachers/filterCombined`, {params}));
  }

  getTeacherInfo(id: number): Promise<User> {
    return lastValueFrom(this.httpClient.get<User>(`${this.baseUrl}/teachers/${id}`));
  }

  sendMessage(id: number, message: string): Promise<any> {
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}/teachers/${id}/message`, message));
  }

  contactTeacher(id: number): Promise<User> {
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}/teachers/${id}/contact`, null));
  }

  updteProfile(data: User): Promise<any> {
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}/change_profile`, data));
  }

  changePassword(id: number): Promise<any> {
    return lastValueFrom(this.httpClient.patch<any>(`${this.baseUrl}/teachers/${id}/comments`, null))
  }


}
