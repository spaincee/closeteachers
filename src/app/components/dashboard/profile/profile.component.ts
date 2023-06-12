import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { AdminService } from 'src/app/services/admin.service';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userLogged: User | null = null;

  constructor(
    private adminService: AdminService,
    private teacherService: TeacherService,
    private studentService: StudentService
  ){}

  ngOnInit(): void {
    this.loadDashboardProfile();
  }

  async loadDashboardProfile(): Promise<void> {
    try {
      let data:any 
      switch (localStorage.getItem('rol')) {
        case 'administrador':
          data = await this.adminService.getDashboardInfo();
          this.userLogged = data.admin;
          break;
        case 'profesor':
           data = await this.teacherService.getDashboardInfo();
          this.userLogged = data.teacher;
          break;
        case 'alumno':
           data = await this.studentService.getDashboardInfo();
          this.userLogged = data.student;
          break;
      
        default:
          break;
      }
      
    }
    catch (error: any) {
      if (error instanceof HttpErrorResponse) {
        let errorMsg = `Se produjo un error desconocido: ${error.message}`;
        
        if(error.error.msg !== undefined)
          errorMsg = error.error.msg;

        Swal.fire({
          text: errorMsg,
          confirmButtonColor: '#3085d6',
          icon: 'warning',
        });
      }else{
        Swal.fire({
          text: error.message,
          confirmButtonColor: '#3085d6',
          icon: 'warning',
        });
      }
    }
  }
}
