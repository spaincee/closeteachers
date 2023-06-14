import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-mystudents',
  templateUrl: './mystudents.component.html',
  styleUrls: ['./mystudents.component.css']
})
export class MystudentsComponent implements OnInit {

  withoutStudents:boolean = false;
  withoutPending:boolean = false;

  studentActiveList: User[] = [];
  studentPendingList: User[] = [];

  userInfo: User = {
    username: '',
    fullname: '',
    email: '',
    password: '',
    rol: '',
  };

  constructor(private teacherService: TeacherService){

  }

  ngOnInit(): void {
      this.loadStudentActiveLists();
      this.loadStudentPendingLists();
  }

  async loadStudentActiveLists(): Promise<any> {
    const data = await this.teacherService.getDashboardInfo();
    this.studentActiveList = data.studentsActive;

    if(typeof this.studentActiveList === 'string')
      this.withoutStudents = true;

    console.log(this.studentActiveList);   
  }

  async loadStudentPendingLists(): Promise<any> {
    const data = await this.teacherService.getDashboardInfo();
    this.studentPendingList = data.studentsPending;

    if(typeof this.studentPendingList === 'string')
      this.withoutPending = true;

    console.log(this.studentPendingList);   
  }

  async seeUserInfor(id_user: any): Promise<any> {
    const result = await this.teacherService.getMyStudentInfo(id_user);    
    this.userInfo = result.student[0];
    console.log(this.userInfo);
  }

  async changeStudentrelationship(id: any): Promise<void>{
    const result = await this.teacherService.agreeStudent(id);
    this.refresh();
  }

  refresh(): void{
    this.loadStudentActiveLists();
    this.loadStudentPendingLists();
  }
}
