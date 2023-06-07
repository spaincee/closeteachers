import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  arrUsers: User[] = [];
  // currentPage: number = 1;
  // totalPages: number = 1;

  constructor(private publicService: PublicService) {}

  ngOnInit(): void {
    this.gotoPage();
  }

  async gotoPage(): Promise<void> {
    try {
      let response = await this.publicService.getAll()
      this.arrUsers = response.teachers;
    }
    catch (error) {
      console.log(error);
    }
  }
}
