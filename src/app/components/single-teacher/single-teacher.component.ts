import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-single-teacher',
  templateUrl: './single-teacher.component.html',
  styleUrls: ['./single-teacher.component.css']
})
export class SingleTeacherComponent {

  user!: User | any;

  constructor(private usersServices: UsersService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let _id: string = (params.userid);
      let response: any = await this.usersServices.getById(_id);
      this.user = response;
    })
  }

  async deleteUser(pId: string | undefined): Promise<void> {
    if (pId !== undefined) {
      try {
        let response = await this.usersServices.delete(pId);
        if (response._id ) {
          alert('El Usuario ' + response.fullname + ' ' + response.last_name + ' ha sido eliminado Satisfactoriamente');
          console.log(response);
        } else {
          alert(response.error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

}
