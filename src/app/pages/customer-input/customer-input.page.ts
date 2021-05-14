import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-customer-input',
  templateUrl: './customer-input.page.html',
  styleUrls: ['./customer-input.page.scss'],
})
export class CustomerInputPage implements OnInit {

  @Input() id: string;
  @Input() contactFullName: string;
  @Input() contactPosition: string;
  @Input() contactPhone: string;
  @Input() edit: boolean;
  
    constructor(private modalController: ModalController) { }
  
    ngOnInit() {
    }
  
    salir(){
      this.modalController.dismiss();
    }
}
