import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
import { SingleTeacherComponent } from './components/single-teacher/single-teacher.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: 'home' },
  { path: "home", component: TeacherListComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "user/:userid", component: SingleTeacherComponent },
  { path: "new", component: UserFormComponent },
  { path: "updateuser/:userid", component: UserFormComponent },

  { path: "login", component: LoginComponent },

  { path: "register", component: RegisterComponent }


  // Router
  // login
  // register
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
