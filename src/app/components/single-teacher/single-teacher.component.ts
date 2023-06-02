import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-single-teacher',
  templateUrl: './single-teacher.component.html',
  styleUrls: ['./single-teacher.component.css']
})
export class SingleTeacherComponent {

  user!: User | any;

  constructor(private publicServices: PublicService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let _id: string = (params.userid);
      let response: any = await this.publicServices.getById(_id);
      this.user = response;
    })
  }

  async deleteUser(pId: string | undefined): Promise<void> {
    if (pId !== undefined) {
      try {
        let response = await this.publicServices.delete(pId);
        if (response.id_user) {
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
