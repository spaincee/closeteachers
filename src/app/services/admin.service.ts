import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl: string = 'https://api-teacher-app.up.railway.app/api/admin/dashboard';
  //baseUrl: string = 'http://localhost:3001/api/admin/dashboard';

  constructor(private httpClient: HttpClient) { }

// Actualizar cuando se pongan todas las rutas desde un DASHBOARD
  getDashboardInfo(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}`))
  }

  getOneAdmin(id: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/admins/${id}`))
  }

  getUserInfo(id: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/userInfo/${id}`))
  }

  getAllAdmin(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/admins`))
  }

  getTeachers(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/teachers`))
  }

  getStudents(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/students`))
  }

  insertUser(data: any): Promise<any> {
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}/newUser`, data))
  }

  updateAdmin(id: number, data: any): Promise<any> {
    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}/admins/${id}`, data))
  }

  updateProfile(data: User): Promise<any> {
    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}/change_profile`, data)); //Ajustar cuando se actualicen las rutas en la API
  }

  changePassword(data: any): Promise<any> {
    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}/change_password`, data));
  }

  changeStatusAdmin(id: number): Promise<any> {
    return lastValueFrom(this.httpClient.patch<any>(`${this.baseUrl}/admins/${id}`, null))
  }

  changeStatusTeacher(id: number): Promise<any> {
    return lastValueFrom(this.httpClient.patch<any>(`${this.baseUrl}/teachers/${id}`, null))
  }

  changeStatusStudent(id: number): Promise<any> {
    return lastValueFrom(this.httpClient.patch<any>(`${this.baseUrl}/students/${id}`, null))
  }

  agreeTeacher(id: number): Promise<any> {
    return lastValueFrom(this.httpClient.patch<any>(`${this.baseUrl}/teachers/${id}/admission`, null))
  }
}
