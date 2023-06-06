import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  baseUrl: string = 'https://api-teacher-app.up.railway.app/api/teacher/dashboard';

  constructor(private httpClient: HttpClient) { }


  getDashboardInfo(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`));
  }

  getStudentInfo(id: number): Promise<User> {
    return lastValueFrom(this.httpClient.get<User>(`${this.baseUrl}/students/${id}`));
  }

  sendMessage(id: number, message: string): Promise<any> {
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}/students/${id}/message`, message));
  }

  updteProfile(data: User): Promise<any> {
    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}/change_profile`, data)); //Ajustar cuando se actualicen las rutas en la API
  }

  changePassword(data: any): Promise<any> {
    return lastValueFrom(this.httpClient.patch<any>(`${this.baseUrl}/change_password`, data))
  }

  agreeStudent(id: number): Promise<any> {
    return lastValueFrom(this.httpClient.patch<any>(`${this.baseUrl}/students/${id}/contact`, null))
  }
}
