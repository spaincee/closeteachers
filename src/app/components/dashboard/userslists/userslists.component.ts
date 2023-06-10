import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { AdminService } from 'src/app/services/admin.service';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userslists',
  templateUrl: './userslists.component.html',
  styleUrls: ['./userslists.component.css']
})
export class UserslistsComponent implements OnInit {

  insert: FormGroup;
  closeModal: string = '';
  showToast: boolean = false;

  adminsList: User[] = [];
  teachersList: User[] = [];
  studentsList: User[] = [];

  userInfo: User = {
    username: '',
    fullname: '',
    email: '',
    password: '',
    rol: ''
  }

  constructor(
    private adminService: AdminService
  ){
    this.insert = new FormGroup(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        fullname: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%.*?&])[A-Za-z\d@$!%.*?&]+$/
          ),
        ]),
        rol: new FormControl('', Validators.required),
      }
    );
  }

  ngOnInit(): void {
      this.loadAdminsLists();
  }


  async loadAdminsLists(): Promise<any>{
    const dataAdmins = await this.adminService.getAllAdmin();
    this.adminsList = dataAdmins.users;
  }

  async loadTeachersLists(): Promise<any>{
    const dataTeachers = await this.adminService.getTeachers();
    this.teachersList = dataTeachers.users;
  }

  async loadStudentsLists(): Promise<any>{
    const dataStudents = await this.adminService.getStudents();
    this.studentsList = dataStudents.users; 
  }
//--------------Combinar estos metodos-----------------------------------------------
  async changeStatus(id_user: any): Promise<any>{
    await this.adminService.changeStatusAdmin(id_user);
    this.loadAdminsLists();
  }

  async changeStatusTeacher(id_user: any): Promise<any>{
    await this.adminService.changeStatusTeacher(id_user);
    this.loadTeachersLists();
  }

  async changeStatusStudent(id_user: any): Promise<any>{
    await this.adminService.changeStatusStudent(id_user);
    this.loadStudentsLists();
  }
//--------------------------------------------------------------
  async activeTeacher(id_user: any): Promise<any>{
    await this.adminService.agreeTeacher(id_user);
    this.loadTeachersLists();
  }

  async seeUserInfor(id_user: any): Promise<any>{
    const result = await this.adminService.getUserInfo(id_user);
    this.userInfo = result.user;
  }

  refreshLists(){
    this.loadAdminsLists();
    this.loadTeachersLists();
    this.loadStudentsLists();
  }

  async insertNewUser() {
    try{
      await this.adminService.insertUser(this.insert.value);
      // this.closeModal = 'modal'
      this.showToast = true;
      this.resetForm();

    }catch(error: any){
      const message: string = error.message;

      switch (true) {
        case message.includes('400'):
          Swal.fire({
            text: `La estructura del EMAIL no es correcta`,
            confirmButtonColor: '#3085d6',
            icon: 'warning',
          })
          break;
        case message.includes('500'):
          Swal.fire({
            text: `Ya existe un usuarios con este USERNAME o EMAIL`,
            confirmButtonColor: '#3085d6',
            icon: 'warning',
          })
          break;
        default:
          Swal.fire({
            text: `Se ha producido el siguiente error: ${error.message}, por favor revise sus datos`,
            confirmButtonColor: '#3085d6',
            icon: 'warning',
          })
          break;
      } 
    }
  }

  resetForm(){
    this.insert.reset();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const toastElement = document.querySelector('.toast');
    if (toastElement && !toastElement.contains(event.target as Node)) {
      this.closeToast();
    }
  }

  closeToast() {
    this.showToast = false;
  }
}
