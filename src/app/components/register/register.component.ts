import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  register: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.register = new FormGroup(
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
        confirmPassword: new FormControl('', [Validators.required]),
        rol: new FormControl(''),
      },
      {
        validators: this.passwordMatch('password', 'confirmPassword'),
      }
    );
  }

  passwordMatch(password: any, confirmPassword: any): any {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];
      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['mustMatch']
      ) {
        return;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ mustMatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  async sendRegister() {
    let { username, fullname, email, password, rol } = this.register.value;
    !rol || rol === undefined ? (rol = 'alumno') : (rol = 'profesor');

    const data: User = { username, fullname, email, password, rol };

    try {
      let resp = await this.authService.register(data);
      
      localStorage.setItem('userId', resp.user.id_user);
      localStorage.setItem('rol', resp.user.rol);
      localStorage.setItem('token', resp.token);

      if (!resp.error) {
        Swal.fire({
          title: 'Excelente!',
          text: `Se ha resgistrado satisfactoriamente`,
          icon: 'success',
          confirmButtonColor: '#3085d6',
        }).then((result) => {
          if (result.isConfirmed) this.router.navigate(['/home']);
          this.register.reset;
        });
      } else {
        Swal.fire({
          text: resp.error,
          confirmButtonColor: '#3085d6',
          icon: 'warning',
        });
      }
    } catch (error: any) {
      const message: string = error.message;

      switch (true) {
        case message.includes('400'):
          Swal.fire({
            text: `La estructura del EMAIL no es correcta`,
            confirmButtonColor: '#3085d6',
            icon: 'warning',
          });
          break;
        case message.includes('500'):
          Swal.fire({
            text: `Ya existe un usuarios con este USERNAME`,
            confirmButtonColor: '#3085d6',
            icon: 'warning',
          });
          break;
        default:
          Swal.fire({
            text: `Se ha producido el siguiente error: ${error.message}, por favor revise sus datos`,
            confirmButtonColor: '#3085d6',
            icon: 'warning',
          });
          break;
      }
    }
  }
}
