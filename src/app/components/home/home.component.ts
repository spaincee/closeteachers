import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
