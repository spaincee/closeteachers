import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
import { TeacherCardComponent } from './components/teacher-card/teacher-card.component';
import { SingleTeacherComponent } from './components/single-teacher/single-teacher.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MapComponent } from './components/map/map.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    TeacherListComponent,
    TeacherCardComponent,
    SingleTeacherComponent,
    UserFormComponent,
    NotificationsComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    MapComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
