import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements AfterViewChecked {

  @ViewChild('cardBody') cardBody!: ElementRef;
  @ViewChild('chatForm', { static: false }) chatForm!: NgForm;

  rol: string | null = localStorage.getItem('rol');

  myContacts: User[] = [];
  messageChatActive: any[]= [];

  userChatActive: User = {
    username: '',
    fullname: '',
    email: '',
    password: '',
    rol: '',
  };
  

  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService){
      this.loadData()
    }

    ngAfterViewChecked() {
      this.scrollToBottom();
    }

    async loadData(): Promise<void> {
      let data: any;
      try{
        switch (this.rol) { 
          case 'profesor':
            data = await this.teacherService.getDashboardInfo();
            this.myContacts = data.studentsActive;
            break;
          case 'alumno':
            data = await this.studentService.getDashboardInfo();
            this.myContacts = data.teachersActive;            
            break;
    
          default:
            break;
        } 
      }catch(error: any){
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

    async ourComunication(id_user: any){
      let data;
      if(this.rol === 'alumno'){
        data = await this.studentService.getMyTeacherInfo(id_user);
        this.userChatActive = data.teacher[0];
        this.messageChatActive = data.chat;
      }else{
        data = await this.teacherService.getMyStudentInfo(id_user);
        this.userChatActive = data.student[0];
        this.messageChatActive = data.chat;
      }
        
    }

    scrollToBottom(): void {
      try {
        if (this.cardBody && this.cardBody.nativeElement) {
          this.cardBody.nativeElement.scrollTop = this.cardBody.nativeElement.scrollHeight;
        }
      } catch (err) {
        console.log(err);
      }
    }
    
    async sendMessage(chatForm: any): Promise<void> {
      let {receiverId, message} = chatForm.value;
      let data: any = {receiverId, message};
      if(data.receiverId && data.message !== ''){
        let result;
        if(this.rol === 'alumno'){          
          result = await this.studentService.sendMessage(data.receiverId, data)
        }else{
          result = await this.teacherService.sendMessage(data.receiverId, data)
        }
        this.ourComunication(data.receiverId);
        
        this.chatForm.resetForm();

      }else{
        console.log('Error');
      }  
    }
}
