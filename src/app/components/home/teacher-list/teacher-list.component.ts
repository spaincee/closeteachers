import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { PublicService } from 'src/app/services/public.service';
import { subjectsData } from 'src/assets/data/subjects.data';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  arrUsers: User[] = [];
  subjectList: string [] = subjectsData.sort();
  filterForm: FormGroup;

  constructor(private publicService: PublicService) {
    this.filterForm = new FormGroup({
      subject: new FormControl('',[]),
      price: new FormControl('',[]),
      experience: new FormControl('',[]),
      score: new FormControl('',[])
    })
  }

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

  async saveFormValues(){
    const subject = this.filterForm.get('subject')?.value;
    let data: any;
    if(subject !== undefined)
      data = await this.publicService.getTeachersbySubject(subject);
      //this.arrUsers = data.teachers;
      console.log(data);
      
  }
}
