import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EmployeeModels } from 'src/app/Models/employee-models';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss'],
})
export class EmployeeInfoComponent implements OnInit {
  @Input() employee: EmployeeModels.IEmployee;

  @Output() deleteEvent = new EventEmitter();
  @Output() updateEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  delete(id: number) {
    this.deleteEvent.emit(id);
  }

  update(id: number) {
    this.updateEvent.emit(id);
  }

}
