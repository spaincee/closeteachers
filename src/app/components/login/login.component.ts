import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  async loginProcess(loginForm: any) {
    const data: any = loginForm.value;
    
    try {
      if(data.email === '' || data.password === '')
        throw new Error('No debe dejar campos vacíos')

      let resp = await this.authService.login(data);
      
      localStorage.setItem('userId', resp.user.id_user);
      localStorage.setItem('rol', resp.user.rol);
      localStorage.setItem('token', resp.token);

      this.router.navigate(['/dashboard/profile']);

    } catch (error: any) {
      if (error instanceof HttpErrorResponse) {
        let errorMsg = 'Se produjo un error con los datos proporcionados, por favor verifique';
        
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
}
