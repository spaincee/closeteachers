import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  
  constructor(private router: Router){}

  canActivate(): boolean | UrlTree {
    const loginToken: string | null = localStorage.getItem('token');
    if(loginToken){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
      
    }
    
    
  }
}
