import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl: string = 'https://api-teacher-app.up.railway.app/api/admin/dashboard';

  constructor(private httpClient: HttpClient) { }

// Actualizar cuando se pongan todas las rutas desde un DASHBOARD
  getOneAdmin(id: number): Promise<User> {
    return lastValueFrom(this.httpClient.get<User>(`${this.baseUrl}/admins/${id}`))
  }

  getAllAdmin(): Promise<User[]> {
    return lastValueFrom(this.httpClient.get<User[]>(`${this.baseUrl}/admins/`))
  }

  getTeachers(): Promise<User[]> {
    return lastValueFrom(this.httpClient.get<User[]>(`${this.baseUrl}/teachers`))
  }

  getStudents(): Promise<User[]> {
    return lastValueFrom(this.httpClient.get<User[]>(`${this.baseUrl}/students`))
  }

  createAdmin(data: any): Promise<any> {
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}/admins`, data))
  }

  updateAdmin(id: number, data: any): Promise<any> {
    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}/admins/${id}`, data))
  }

  changePassword(data: any): Promise<any> {
    return lastValueFrom(this.httpClient.patch<any>(`${this.baseUrl}/admins/change_password`, data))
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
