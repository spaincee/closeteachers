import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  passwordVisible: boolean = false;
  changePassword: boolean = false;
  changeImage: boolean = false;


  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
  
  toggleInputImage(): void {
    this.changeImage = true;
  }

  toggleChangePassword(): void {
    this.changePassword = true;
  }
}
