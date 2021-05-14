import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {CustomerModels} from 'src/app/models/customer-models';
import { CustomerInputPage } from 'src/app/pages/customer-input/customer-input.page';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss'],
})
export class CustomerInfoComponent implements OnInit {

  @Input() customer: CustomerModels.ICustomer;

  @Output() deleteEvent = new EventEmitter();
  @Output() updateEvent = new EventEmitter();

  editing: boolean = false;

  constructor(public modalController:ModalController) { }

  ngOnInit() {}

  delete(id: string) {
    this.deleteEvent.emit(id);
  }

  update(id: string) {
    this.updateEvent.emit(id);
  }

  toggleEditing() {
    this.editing = !this.editing;
  }

  async abrirModal() {
    const modal = await this.modalController.create({
      component: CustomerInputPage,
      componentProps:{
        id: this.customer.id,
        contactFullName: this.customer.contactFullName,
        contactPosition: this.customer.contactPosition,
        contactPhone: this.customer.contactPhone,
        edit: false
      }
    });
    return await modal.present();
  }

}
