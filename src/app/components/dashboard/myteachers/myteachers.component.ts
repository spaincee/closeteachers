import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-myteachers',
  templateUrl: './myteachers.component.html',
  styleUrls: ['./myteachers.component.css'],
})
export class MyteachersComponent implements OnInit {
  showToast: boolean = false;
  toastmessage: string = '';

  teachersList: User[] = [];
  subjectsList: string[] = [];
  usedId: number = 0;
  score: number = 0;
  comment: string = '';

  userInfo: User = {
    username: '',
    fullname: '',
    email: '',
    password: '',
    rol: '',
  };

  commentForm: FormGroup;

  constructor(private studentService: StudentService) {
    this.commentForm = new FormGroup({
      usedId: new FormControl('', []),
      score: new FormControl('', []),
      comment: new FormControl('', []),
    });
  }

  ngOnInit(): void {
    this.loadTicherLists();
  }

  async loadTicherLists(): Promise<any> {
    const data = await this.studentService.getDashboardInfo();
    this.teachersList = data.teachers;
  }

  stringToArray(string: string | undefined): string[] {
    if (string !== undefined) return JSON.parse(string);
    return [];
  }

  async seeUserInfor(id_user: any): Promise<any> {
    const result = await this.studentService.getMyTeacherInfo(id_user);
    this.userInfo = result.teacher[0];
    console.log(this.userInfo);
  }

  async seeCommentTeacher(id_user: any): Promise<any> {
    const result = await this.studentService.getMyTeacherInfo(id_user);
    this.usedId = result.teacher[0].id_user;
    if (result.teacher[0].score) {
      this.score = result.teacher[0].score;
      this.commentForm.get('score')?.setValue(this.score);
    } else {
      this.score = 0;
      this.commentForm.get('score')?.setValue(this.score);
    }
    this.comment = result.teacher[0].comments;
  }

  async sendComment() {
    const { score, comment } = this.commentForm.value;
    const data = { score, comment };
    try {
      const result = await this.studentService.ratingAndCommenting(
        this.commentForm.get('usedId')?.value,
        data
      );
      this.toastmessage = result.msg;
      this.showToast = true;
      this.commentForm.reset();
      //this.closeModal();

    } catch (error: any) {
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

  closeToast() {
    this.showToast = false;
  }
}
