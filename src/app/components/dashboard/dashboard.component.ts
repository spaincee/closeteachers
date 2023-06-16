import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  rol: string | null = localStorage.getItem('rol');
  selectedItemIndex: number = 0;

  userImage?: string;

  constructor(
    private adminService: AdminService,
    private teacherService: TeacherService,
    private studentService: StudentService,
    private router: Router
  ){}

  async ngOnInit() {
    try {
      let data:any 
      switch (localStorage.getItem('rol')) {
        case 'administrador':
          data = await this.adminService.getDashboardInfo();
          this.userImage = data.admin.image;
          break;
        case 'profesor':
           data = await this.teacherService.getDashboardInfo();
          this.userImage = data.teacher.image;
          break;
        case 'alumno':
           data = await this.studentService.getDashboardInfo();
          this.userImage = data.student.image;
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

  selectItem(index: number) {
    if (this.selectedItemIndex === index) {
      this.selectedItemIndex = -1; 
    } else {
      this.selectedItemIndex = index;
    }
  }

  logout():void {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('userId');

    this.router.navigate(['/home']);
  }
}
