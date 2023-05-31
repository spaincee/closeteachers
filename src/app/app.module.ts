import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
import { TeacherCardComponent } from './components/teacher-card/teacher-card.component';
import { SingleTeacherComponent } from './components/single-teacher/single-teacher.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    TeacherListComponent,
    TeacherCardComponent,
    SingleTeacherComponent,
    UserFormComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
