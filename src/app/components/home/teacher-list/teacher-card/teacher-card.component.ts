import { Component, Host, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { PublicService } from 'src/app/services/public.service';
import { TeacherListComponent } from '../teacher-list.component';


@Component({
  selector: 'app-teacher-card',
  templateUrl: './teacher-card.component.html',
  styleUrls: ['./teacher-card.component.css']
})
export class TeacherCardComponent  {
  @Input() myUser!: User;

  stars: number[] = [1, 2, 3, 4, 5];


  constructor(
    @Host() private _teacherList: TeacherListComponent,
    private publicService: PublicService) { }

  stringToArray(string: string | undefined): string[] {
    if (string !== undefined) return JSON.parse(string);
    return [];
  }

  async seeUserInfo(id: number | undefined): Promise<void>{
    this._teacherList.seeUserInfo(id);
  }

  printStart(avg?: number): number{
    if(avg !== undefined){
      return avg;
    }
    return 0;
  }
}
