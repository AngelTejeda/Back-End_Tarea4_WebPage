import { DecimalPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-product-input',
  templateUrl: './product-input.page.html',
  styleUrls: ['./product-input.page.scss'],
})
export class ProductInputPage implements OnInit {

  @Input() id: number;
  @Input() name: string;
  @Input() price: number;
  @Input() discontinued: boolean;
  @Input() edit: boolean;
  
    constructor(private modalController: ModalController) { }
  
    ngOnInit() {
    }
  
    salir(){
      this.modalController.dismiss();
    }
}
