import { Component, OnInit, Input } from '@angular/core';
import { IEmployee } from 'src/app/Models/employee-model';

@Component({
  selector: 'app-employee-input',
  templateUrl: './employee-input.component.html',
  styleUrls: ['./employee-input.component.scss'],
})
export class EmployeeInputComponent implements OnInit {
  @Input() employee: IEmployee = {id: null, homeAddress: null, name: null, familyName: null};

  constructor() { }

  ngOnInit() {
    
  }

  logForm() {
    console.log(this.employee);
  }

}
