import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
import { SingleTeacherComponent } from './components/single-teacher/single-teacher.component';
import { UserFormComponent } from './components/user-form/user-form.component';

const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: 'home' },
  { path: "home", component: TeacherListComponent },
  { path: "user/:userid", component: SingleTeacherComponent },
  { path: "new", component: UserFormComponent },
  { path: "updateuser/:userid", component: UserFormComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
