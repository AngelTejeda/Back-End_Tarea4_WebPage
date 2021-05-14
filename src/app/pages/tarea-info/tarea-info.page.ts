import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tarea-info',
  templateUrl: './tarea-info.page.html',
  styleUrls: ['./tarea-info.page.scss'],
})
export class TareaInfoPage implements OnInit {

  constructor(private modalController: ModalController) { }

  equipo=[
    "Jose Santos Flores Silva",
    "Edson Yael Garcia Silva",
    "Sofia Alejandra Gaytan Diaz",
    "Angel Tejeda Tiscareño"
  ]

  ngOnInit() {
  }

  salir(){
    this.modalController.dismiss();
  }

}
