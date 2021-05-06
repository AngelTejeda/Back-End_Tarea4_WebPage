import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string; 

  array=[
    {
      name: "Sofía",
      id: 1
    },
    {
      name:"Angel",
      id: 2
    }
  ]


  constructor() { }

  ngOnInit() {}

  deleteElement(){
    alert("Hola");
  }

}
