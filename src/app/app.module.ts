import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TeacherListComponent } from './components/home/teacher-list/teacher-list.component';
import { TeacherCardComponent } from './components/home/teacher-list/teacher-card/teacher-card.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MapComponent } from './components/home/map/map.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { MyteachersComponent } from './components/dashboard/myteachers/myteachers.component';
import { MessagesComponent } from './components/dashboard/messages/messages.component';
import { MystudentsComponent } from './components/dashboard/mystudents/mystudents.component';
import { SettingsComponent } from './components/dashboard/settings/settings.component';
import { UserslistsComponent } from './components/dashboard/userslists/userslists.component';

@NgModule({
  declarations: [
    AppComponent,
    TeacherListComponent,
    TeacherCardComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    MapComponent,
    HomeComponent,
    ProfileComponent,
    MyteachersComponent,
    MessagesComponent,
    MystudentsComponent,
    SettingsComponent,
    UserslistsComponent
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
