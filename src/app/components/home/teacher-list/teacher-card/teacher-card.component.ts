import { Component, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { PublicService } from 'src/app/services/public.service';


@Component({
  selector: 'app-teacher-card',
  templateUrl: './teacher-card.component.html',
  styleUrls: ['./teacher-card.component.css']
})
export class TeacherCardComponent  {
  @Input() myUser!: User;

  constructor(private publicServices: PublicService) { }

  async deleteUser(): Promise<void> {
    // if (pId !== undefined) {
    //   try {
    //     let response = await this.publicServices.delete(pId);
    //     if (response.id_user ) {
    //       console.log(response);
    //       alert('El Usuario ' + response.fullname + ' ' + response.last_name + ' ha sido eliminado Satisfactoriamente');
    //     } else {
    //       alert(response.error);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  }

}