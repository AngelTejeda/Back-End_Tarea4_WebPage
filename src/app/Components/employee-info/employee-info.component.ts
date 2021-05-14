import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EmployeeModels } from 'src/app/Models/employee-models';
import { EmployeeInputPage } from 'src/app/pages/employee-input/employee-input.page';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss'],
})
export class EmployeeInfoComponent implements OnInit {
  @Input() employee: EmployeeModels.IEmployee;

  @Output() deleteEvent = new EventEmitter();
  @Output() updateEvent = new EventEmitter();

  editing: boolean = false;

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  delete(id: number) {
    this.deleteEvent.emit(id);
  }

  update(id: number) {
    this.updateEvent.emit(id);
  }

  toggleEditing() {
    this.editing = !this.editing;
  }

  async abrirModal(editable: boolean) {
    const modal = await this.modalController.create({
      component: EmployeeInputPage,
      componentProps:{
        id: this.employee.id,
        name: this.employee.name,
        familyName: this.employee.familyName,
        homeAddress: this.employee.homeAddress,
        edit: editable
      }
    });
    return await modal.present();
  }

}
