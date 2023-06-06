import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { MyteachersComponent } from './components/dashboard/myteachers/myteachers.component';
import { MessagesComponent } from './components/dashboard/messages/messages.component';
import { MystudentsComponent } from './components/dashboard/mystudents/mystudents.component';
import { SettingsComponent } from './components/dashboard/settings/settings.component';
import { UserslistsComponent } from './components/dashboard/userslists/userslists.component';

const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: 'home' },
  { path: "home", component: HomeComponent },

  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },

  { path: "dashboard", component: DashboardComponent, children: [
    { path: "profile", component: ProfileComponent },
    { path: "myteachers", component: MyteachersComponent },
    { path: "mystudents", component: MystudentsComponent },
    { path: "messages", component: MessagesComponent },
    { path: "settings", component: SettingsComponent },
    { path: "lists", component: UserslistsComponent }
  ] },

  // { path: "user/:userid", component: SingleTeacherComponent }

  


  // Router
  // login
  // register
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
