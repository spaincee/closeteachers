import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { PublicService } from 'src/app/services/public.service';
import { StudentService } from 'src/app/services/student.service';
import { subjectsData } from 'src/assets/data/subjects.data';
import {getDistance} from 'ol/sphere';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css'],
})
export class TeacherListComponent implements OnInit {

  @Output() listaActualizada: EventEmitter<any[]> = new EventEmitter<any[]>();

  rol: string | null = localStorage.getItem('rol');

  stars: number[] = [1, 2, 3, 4, 5];
  arrUsers: User[] = [];
  arrUsersSorted: User[] = [];
  subjectList: string[] = subjectsData.sort();

  p: number = 1;
  relationshipStatus?: number;

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
    private publicService: PublicService,
    private studentService: StudentService
  ) {
    this.filterForm = new FormGroup({
      subject: new FormControl('', []),
      price: new FormControl('0', []),
      experience: new FormControl('0', []),
      score: new FormControl('0', []),
    });

   
  }

  ngOnInit(): void {
    this.gotoPage();
  }

  async gotoPage(): Promise<void> {
    try {
      let response = await this.publicService.getAll();
      this.arrUsers = response.teachers;
  
      this.arrUsersSorted = this.sortbyAverage(this.arrUsers).filter((elem) => {
        return elem.average !== 0 && elem.average !== null;
      });

    } catch (error) {
      console.log(error);
    }
  }

  async applyFilter(): Promise<void> { 
    await this.gotoPage();

    if (this.filterForm.get('subject')?.value) {
      this.arrUsers = this.filterbySubject(
        this.arrUsers,
        this.filterForm.get('subject')?.value
      );
    }
    if (this.filterForm.get('price')?.value > 0) {
      this.arrUsers = this.filterbyPrice(
        this.arrUsers,
        this.filterForm.get('price')?.value
      );
    }
    if (this.filterForm.get('experience')?.value > 0) {
      this.arrUsers = this.filterbyExperience(
        this.arrUsers,
        this.filterForm.get('experience')?.value
      );
    }
    if (this.filterForm.get('score')?.value > 0) {
      this.arrUsers = this.filterbyScore(
        this.arrUsers,
        this.filterForm.get('score')?.value
      );
    }

    this.listaActualizada.emit(this.arrUsers);
  }

  async showNearbyTeachers(): Promise<void>{
    try{
      //await this.gotoPage();
      
      const distances: any[] = [];
      const currentPosition = await this.getGeolocation();

      this.arrUsers.forEach((teacher, index) => {
        if(teacher['location'] && teacher['location'] != null){
          const location = JSON.parse(teacher['location']);
          const distance = getDistance(currentPosition, [location[1], location[0]])
          distances.push({ index, distance });          
        }
      });

      this.arrUsers = distances.filter((item) => item.distance < 10000).map((item) => this.arrUsers[item.index]);

      console.log(this.arrUsers);
      
      this.listaActualizada.emit(this.arrUsers);

    }catch(error: any){
      console.log(error.message);
    }
  }

  resetFilters() {
    this.gotoPage();
    this.filterForm.reset();
  }

  // Funciones para filtros --------------------------------------------------------
 
  filterbySubject(teachers: User[], subject: string): User[] {
    let result: User[] = [];
    teachers.forEach((teacher) => {
      if (teacher.subjects) {
        if (JSON.parse(teacher.subjects).includes(subject)) {
          result.push(teacher);
        }
      }
    });
    return result;
  }

  filterbyPrice(teachers: User[], price: number): User[] {
    let result: User[] = [];
    teachers.forEach((teacher) => {
      if (teacher.price !== undefined && teacher.price <= price) {
        result.push(teacher);
      }
    });
    return result;
  }

  filterbyExperience(teachers: User[], experience: number): User[] {
    let result: User[] = [];
    teachers.forEach((teacher) => {
      if (
        teacher.experience !== undefined &&
        teacher.experience <= experience
      ) {
        result.push(teacher);
      }
    });
    return result;
  }

  filterbyScore(teachers: User[], score: number): User[] {
    let result: User[] = [];
    teachers.forEach((teacher) => {
      if (teacher.average !== null && teacher.average! >= score) {
        result.push(teacher);
      }
    });
    return result;
  }
  //-------------------------------------------------------------------------------

  async seeUserInfo(id: number | undefined): Promise<void> {
    try {
      if (id !== undefined) {
        const data = await this.publicService.getTeacherInfo(id);
        if (
          localStorage.getItem('rol') &&
          localStorage.getItem('rol') === 'alumno'
        ) {
          const status = await this.studentService.relationshipStatus(id);
          this.relationshipStatus = status.status;
        }
        this.userToShow = data.teacher[0];
        this.userToShowAVG = data.teacherAVG[0].average;
        const result: any[] = data.teacherComments;
        this.userToShowComments = result.filter(
          (comment) => comment.comments !== null
        );
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async contract(): Promise<void> {
    try {
      const result = await this.studentService.contactTeacher(
        this.userToShow.id_user!
      );
      console.log(result);

      this.relationshipStatus = 0;
    } catch (error: any) {
      console.log(error);
    }
  }

  stringToArray(string: string | undefined): string[] {
    if (string !== undefined) return JSON.parse(string);
    return [];
  }

  sortbyAverage(list: any[]): any[] {
    return list.sort((a, b) => b.average - a.average);
  }

  async getGeolocation(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords: any[] = [ position.coords.longitude, position.coords.latitude];
            resolve(coords);
          },
          (error) => {
            console.error('Error al obtener la geolocalización:', error);
            reject(error);
          }
        );
      } else {
        console.error('Geolocalización no disponible');
        reject(new Error('Geolocalización no disponible'));
      }
    });
  }
}
