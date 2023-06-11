import { HttpErrorResponse } from '@angular/common/http';
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
import Swal from 'sweetalert2';

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
  showToast: boolean = false;

  toastMessage: string = '';

  subjectsList: string[] = subjectsData;
  subjectsSelected: string[] = [];
  location: number[] = [];
  settingForm: FormGroup;
  passwordForm: FormGroup;

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
      fullname: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
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
    
    this.passwordForm = new FormGroup({
      oldPassword: new FormControl('', []),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%.*?&])[A-Za-z\d@$!%.*?&]+$/)]),
      confirmPassword: new FormControl('', [Validators.required])
    },
    {
      validators: this.passwordMatch('newPassword','confirmPassword')
    });
    
  }

  // Iniciamos el componenete cargado los datos del usuario registrado
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

    // Si el usuario tiene valores definido en estas dos caracteristicas entonces se muestran
    if(this.userLogged.image)
      this.toggleInputImage();
 
    if(this.userLogged.description)
      this.toggleDescription();


    // Preparamos la ubicacion del usuario en caso de ser un profesor
    if(typeof this.userLogged['location'] === 'string'){
      const result = JSON.parse(this.userLogged['location']);
      if(typeof result === 'string'){
        const trimmedString = result.slice(1, -1);
      this.location = trimmedString.split(',').map((location: String) => parseFloat(location.trim()));
      }
      if(typeof result === 'object'){
        this.location = result;
      }
    }    
    
    // Preparamos el listado de materias que tiene el usuario en caso de ser un profesor
    if(typeof this.userLogged['subjects'] === 'string'){
      const result = JSON.parse(this.userLogged['subjects']);
      if(typeof result === 'string'){
        const trimmedString = result.slice(1, -1);
      this.subjectsSelected = trimmedString.split(',').map((subject: String) => subject.trim());
      }
      if(typeof result === 'object'){
        this.subjectsSelected = result;
      } 
    }
  }

   // Verifica que las materias que se estan generando esten definidas previamente por el profesor, si es asi
  // las marca como checkeadas.
  existSubject(subject: string): boolean {
    if (this.subjectsSelected.includes(subject)) {
      let i = this.subjectsSelected.indexOf(subject);
      if (i === -1) this.subjectsSelected.push(subject);
      return true;
    }
    return false;
  }

  // Esta funcion esta la encargada de ir insertando las materias que el profesor impartira
  // este resultado se guardara en un variable que es la que se guardara posteriormente
  subjectsControl(subject: string): void {
    let i = this.subjectsSelected.indexOf(subject);
    i === -1
      ? this.subjectsSelected.push(subject)
      : this.subjectsSelected.splice(i, 1);
  }

  // Funcion para cambiar el password
  async changePasswordForm(){
    const { oldPassword, newPassword } = this.passwordForm.value;
    const data = { oldPassword, newPassword };
    try{
      let result: any;
    switch (this.rol) {
      case 'administrador':
        result = await this.adminService.changePassword(data);
        this.toastMessage = result.msg;
        this.showToast = true;
        this.passwordForm.reset();
        break;
      case 'profesor':
        result = await this.teacherService.changePassword(data);
        this.toastMessage = result.msg;
        this.showToast = true;
        this.passwordForm.reset();
        break;
      case 'alumno':
        result = await this.studentService.changePassword(data);
        this.toastMessage = result.msg;
        this.showToast = true; 
        this.passwordForm.reset();       
        break;

      default:
        break;
    }
    }catch(error: any){
      if (error instanceof HttpErrorResponse) {
        let errorMsg = 'Se produjo un error desconocido';
        
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

  // Funcion submit
  async saveFormValues(): Promise<void> {
    let user: User = this.settingForm.value;
    try{
      let data: any;
    switch (this.rol) {
      case 'administrador':
        data = await this.adminService.updateProfile(user);
        this.toastMessage = data.msg
        this.showToast = true;
        break;
      case 'profesor':
        user['subjects'] = JSON.stringify(this.subjectsSelected);
        user['location'] = JSON.stringify(this.location);
        data = await this.teacherService.updateProfile(user);
        this.toastMessage = data.msg
        this.showToast = true;
        break;
      case 'alumno':
        data = await this.studentService.updateProfile(user);
        this.toastMessage = data.msg
        this.showToast = true;
        break;

      default:
        break;
    }
    }catch(error: any){
      if (error instanceof HttpErrorResponse) {
        let errorMsg = 'Se produjo un error desconocido';
        
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

  closeToast(): void {
    this.showToast = false;
  }

  passwordMatch(new_pass:any, confirm_pass:any): any  {
    return (formGroup:FormGroup)=>{
      const passwordControl = formGroup.controls[new_pass];
      const confirmPasswordControl = formGroup.controls[confirm_pass];
      if(confirmPasswordControl?.errors && !confirmPasswordControl?.errors['mustMatch']){
        return;
      }
      
      if(passwordControl.value !== confirmPasswordControl.value){
        confirmPasswordControl.setErrors({ mustMatch: true });
      }else{
        confirmPasswordControl.setErrors(null);
      }
    }
  }
}
