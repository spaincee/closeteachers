import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isLogged: boolean = false;

  constructor(private router: Router){ }

  ngDoCheck(): void {
    let token: string | null = localStorage.getItem('token');
    if(token){
      this.isLogged = true;
    }
  }

  logout():void {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('userId');

    window.location.href = '/home';
  }
}
