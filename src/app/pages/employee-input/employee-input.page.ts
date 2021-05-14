import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import EmployeeModels from 'src/app/Models/employee-models';

@Component({
  selector: 'app-employee-input',
  templateUrl: './employee-input.page.html',
  styleUrls: ['./employee-input.page.scss'],
})
export class EmployeeInputPage implements OnInit {
@Input() id: number;
@Input() name: string;
@Input() familyName: string;
@Input() homeAddress: string;
@Input() edit: boolean;

employee: EmployeeModels.IEmployeePut;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  salir(){
    this.modalController.dismiss();
  }

}
