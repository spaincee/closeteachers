import { Component, OnInit } from '@angular/core';
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

  arrUsers: User[] = [];
  subjectList: string [] = subjectsData.sort();
  filterForm: FormGroup;

  constructor(private publicService: PublicService) {
    this.filterForm = new FormGroup({
      subject: new FormControl('',[]),
      price: new FormControl('0',[]),
      experience: new FormControl('0',[]),
      score: new FormControl('0',[])
    })
  }

  ngOnInit(): void {
    this.gotoPage();
  }

  async gotoPage(): Promise<void> {
    try {
      let response = await this.publicService.getAll()
      this.arrUsers = response.teachers;
    }
    catch (error) {
      console.log(error);
    }
  }

  async saveFormValues(){
    let arrUsersFiltered: User[] = this.arrUsers;

    if(this.filterForm.get('subject')?.value){
      arrUsersFiltered = this.filterbySubject(arrUsersFiltered, this.filterForm.get('subject')?.value);
    }
    if(this.filterForm.get('price')?.value > 0){
      arrUsersFiltered = this.filterbyPrice(arrUsersFiltered, this.filterForm.get('price')?.value);
    }
    if(this.filterForm.get('experience')?.value > 0){
      arrUsersFiltered = this.filterbyExperience(arrUsersFiltered, this.filterForm.get('experience')?.value);
    }
    
    this.arrUsers = arrUsersFiltered;
    
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

  resetFilters(){
    this.gotoPage();
    this.filterForm.reset();
  }

}
