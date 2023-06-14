import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { ComunicationsService } from 'src/app/services/comunications.service';
import { PublicService } from 'src/app/services/public.service';
import { subjectsData } from 'src/assets/data/subjects.data';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  @Output() listaActualizada: EventEmitter<any[]> = new EventEmitter<any[]>();

  arrUsers: User[] = [];
  subjectList: string [] = subjectsData.sort();

  filterForm: FormGroup;

  constructor(
    private publicService: PublicService,
    private comunicationService: ComunicationsService) {
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
    
    this.listaActualizada.emit(this.arrUsers);
    //this.comunicationService.actualizarLista(this.arrUsers);

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
