import { Component, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-teacher-card',
  templateUrl: './teacher-card.component.html',
  styleUrls: ['./teacher-card.component.css']
})
export class TeacherCardComponent  {
  @Input() myUser!: User;

  constructor(private usersServices: UsersService) { }

  async deleteUser(pId: string | undefined): Promise<void> {
    if (pId !== undefined) {
      try {
        let response = await this.usersServices.delete(pId);
        if (response._id ) {
          console.log(response);
          alert('El Usuario ' + response.fullname + ' ' + response.last_name + ' ha sido eliminado Satisfactoriamente');
        } else {
          alert(response.error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

}
