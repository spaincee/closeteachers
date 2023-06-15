import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { PublicService } from 'src/app/services/public.service';
import { subjectsData } from 'src/assets/data/subjects.data';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  @Output() listaActualizada: EventEmitter<any[]> = new EventEmitter<any[]>();

  stars: number[]=[1, 2, 3, 4, 5];
  arrUsers: User[] = [];
  subjectList: string [] = subjectsData.sort();

  userToShow: User = {
    username: '',
    fullname: '',
    email: '',
    password: '',
    rol: '',
  };
  userToShowAVG: number = 0;
  userToShowComments?: any[];

  filterForm: FormGroup;

  constructor(
    private publicService: PublicService) {
    this.filterForm = new FormGroup({
      subject: new FormControl('',[]),
      price: new FormControl('0',[]),
      experience: new FormControl('0',[]),
      score: new FormControl('0',[])
    })

    this.gotoPage();
  }

  ngOnInit(): void { 
  }

  async gotoPage(): Promise<void> {
    try {
      let response = await this.publicService.getAll()
      this.arrUsers = response.teachers;
      console.log(this.arrUsers);
      
    }
    catch (error) {
      console.log(error);
    }
  } 

  async saveFormValues(){
    await this.gotoPage();

    if(this.filterForm.get('subject')?.value){
      this.arrUsers = this.filterbySubject(this.arrUsers, this.filterForm.get('subject')?.value);
    }
    if(this.filterForm.get('price')?.value > 0){
      this.arrUsers = this.filterbyPrice(this.arrUsers, this.filterForm.get('price')?.value);
    }
    if(this.filterForm.get('experience')?.value > 0){
      this.arrUsers = this.filterbyExperience(this.arrUsers, this.filterForm.get('experience')?.value);
    }
    if(this.filterForm.get('score')?.value > 0){
      this.arrUsers = this.filterbyScore(this.arrUsers, this.filterForm.get('score')?.value);
    }
    
    this.listaActualizada.emit(this.arrUsers);

  }

  // Funciones para filtros
  filterbySubject(teachers: User[], subject: string): User[] {
    let result: User[] = [];
    teachers.forEach(teacher => {
      if(teacher.subjects){
        if(JSON.parse(teacher.subjects).includes(subject)){
          result.push(teacher);
        }
      }
    })
    return result;
  }

  filterbyPrice(teachers: User[], price: number): User[] {
    let result: User[] = [];
    teachers.forEach(teacher => {
      if(teacher.price !== undefined && teacher.price <= price){
        result.push(teacher);
      }
    })
    return result;
  }

  filterbyExperience(teachers: User[], experience: number): User[] {
    let result: User[] = [];
    teachers.forEach(teacher => {
      if(teacher.experience !== undefined && teacher.experience <= experience){
        result.push(teacher);
      }
    })
    return result;
  }

  filterbyScore(teachers: User[], score: number): User[] {
    let result: User[] = [];
    teachers.forEach(teacher => {
      if(teacher.average !== null && teacher.average! >= score){
        result.push(teacher);
      }
    })
    return result;
  }

  resetFilters(){
    this.gotoPage();
    this.filterForm.reset();
  }

  async seeUserInfo(id: number | undefined): Promise<void>{
    try{
      if(id !== undefined){
        const data = await this.publicService.getTeacherInfo(id);
        this.userToShow = data.teacher[0];
        this.userToShowAVG = data.teacherAVG[0].average;
        const result: any[] = data.teacherComments;
        this.userToShowComments = result.filter((comment)=> comment.comments !== null);        
      }  
      console.log(this.userToShowComments);
        

    }catch(error: any){
      console.log(error.message);

    }
  }

  stringToArray(string: string | undefined): string[] {
    if (string !== undefined) return JSON.parse(string);
    return [];
  }

}
