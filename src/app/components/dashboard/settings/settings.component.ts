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
  addDescription: boolean = false;
  geolocation: boolean = false;
  rol: string | null = localStorage.getItem('rol');

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

  useGeo(): void {
    this.geolocation = !this.geolocation;
  }
}
