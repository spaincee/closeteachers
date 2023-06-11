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

  sendMessage(id: number, message: string): Promise<any> {
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}/teachers/${id}/message`, message));
  }

  contactTeacher(id: number): Promise<User> {
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}/teachers/${id}/contact`, null));
  }

  updateProfile(data: User): Promise<any> {
    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}/change_profile`, data));
  }

  changePassword(data: any): Promise<any> {
    return lastValueFrom(this.httpClient.patch<any>(`${this.baseUrl}/change_password`, data))
  }


}
