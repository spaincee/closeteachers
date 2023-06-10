import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { AdminService } from 'src/app/services/admin.service';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { subjectsData } from 'src/assets/data/subjects.data';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  passwordVisible: boolean = false;
  changePassword: boolean = false;
  changeImage: boolean = false;
  addDescription: boolean = false;

  subjectsList: string[] = subjectsData;
  subjectsSelected: string[] = [];
  location: number[] = [];
  settingForm: FormGroup;

  rol: string | null = localStorage.getItem('rol');
  userLogged: User = {
    username: '',
    fullname: '',
    email: '',
    password: '',
    rol: '',
  };

  constructor(
    private adminService: AdminService,
    private teacherService: TeacherService,
    private studentService: StudentService
  ) {
    this.settingForm = new FormGroup({
      fullname: new FormControl('', []),
      username: new FormControl('', []),
      email: new FormControl('', []),
      phone: new FormControl('', []),
      image: new FormControl('', []),
      description: new FormControl('', []),
      latitude: new FormControl({ value: 'latitude', disabled: false }, [
        Validators.required,
      ]),
      longitude: new FormControl({ value: 'longitude', disabled: false }, [
        Validators.required,
      ]),
      price: new FormControl('', []),
      experience: new FormControl('', []),
      cover: new FormControl('', []),
      brief_description: new FormControl('', []),
    });    
    
  }

  async ngOnInit(): Promise<void> {
    let data: any;
    switch (this.rol) {
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

    if(typeof this.userLogged['subjects'] === 'string'){
      const subjectsString = JSON.parse(this.userLogged['subjects']);
      const trimmedString = subjectsString.slice(1, -1);
      this.subjectsSelected = trimmedString.split(',').map((subject: String) => subject.trim());

      console.log(this.subjectsSelected);
    
    }

    if(typeof this.userLogged['location'] === 'string'){
      const locationString = JSON.parse(this.userLogged['location']);
      const trimmedString = locationString.slice(1, -1);
      this.location = trimmedString.split(',').map((location: String) => parseFloat(location.trim()));
    }
    
    console.log(this.location);
    console.log(this.userLogged);
  }

  // Funcion submit
  saveFormValues(): void {
    console.log(this.subjectsSelected);
  }

  // Esta funcion esta la encargada de crear un listado con todas las materias que el profesor impartira
  subjectsControl(subject: string): void {
    let i = this.subjectsSelected.indexOf(subject);
    i === -1
      ? this.subjectsSelected.push(subject)
      : this.subjectsSelected.splice(i, 1);
  }

  // Funcion que es la escargada de optar por usar la geolocalizacion del navegador, se deben implementar
  // los permisos para esto.
  useGeo(): void {
    const status1 = this.settingForm.controls['latitude'].status;
    const status2 = this.settingForm.controls['longitude'].status;

    if (status1 === 'VALID') {
      this.settingForm.controls['latitude'].disable();
      this.settingForm.patchValue({
        latitude: '-262.6534',
      });
    } else {
      this.settingForm.controls['latitude'].enable();
    }

    if (status2 === 'VALID') {
      this.settingForm.controls['longitude'].disable();
      this.settingForm.patchValue({
        longitude: '62.6534',
      });
    } else {
      this.settingForm.controls['longitude'].enable();
    }
  }

  // Verifica que las materias que se estan generando esten definidad previamente por el profesor, si es asi
  // marca como checkeadas.
  existSubject(subject: string): boolean {
    if (this.subjectsSelected.includes(subject)) {
      let i = this.subjectsSelected.indexOf(subject);
      if (i === -1) this.subjectsSelected.push(subject);
      return true;
    }
    return false;
  }

  //---------------------------------- Funciones Toggles ------------------------------

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleInputImage(): void {
    this.changeImage = true;
  }

  toggleChangePassword(): void {
    this.changePassword = true;
  }

  toggleDescription(): void {
    this.addDescription = !this.addDescription;
  }
}
