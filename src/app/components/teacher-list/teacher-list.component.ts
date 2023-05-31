import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  arrUsers: User[] = [];
  // currentPage: number = 1;
  // totalPages: number = 1;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.gotoPage();
  }

  async gotoPage(): Promise<void> {
    try {
      let response = await this.usersService.getAll()
      console.log(response);
      this.arrUsers = response.teachers;
      console.log(this.arrUsers);
    }
    catch (error) {
      console.log(error);
    }
  }
}
