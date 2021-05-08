import { Component, Input, OnInit } from '@angular/core';
import { IResponse } from 'src/app/Models/api-response-model';
import { IEmployee } from 'src/app/Models/employee-model';
import { HttpProviderService } from 'src/app/Services/http-provider/http-provider.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements OnInit {
  @Input() name: string;
  @Input() controller: string;
  
  elements: IEmployee[] = []
  nextPage?: number = 1;
  currentPage?: number = null;
  previousPage?: number = null;

  loaded: boolean = false;
  error: boolean = false;
  loading: boolean = false;
  addingElement: boolean = false;

  constructor(private http: HttpProviderService) {
    
  }

  ngOnInit() {
    this.getNextPage();
  }

  loadTestElems() {
    alert("aber");
    this.loaded = true;
    this.error = false;
    this.nextPage = null;
    this.currentPage = 1;
    this.previousPage = null;

    this.elements = [
      {
        id: 1,
        homeAddress: "adhfasd",
        name:"Andrea",
        familyName: "Morales"
      },
      {
        id: 2,
        homeAddress: "sadfasd",
        name:"Ángel",
        familyName: "Tejeda"
      },
    ]
  }

  addElement() {
    this.addingElement = true;

    let employee: IEmployee = {
      homeAddress: "Una casa",
      name: "Un nombre",
      familyName: "Un apellido"
    }

    this.http.postRequest(this.controller, employee)
      .subscribe(
        (data) => {
          alert("Successfully Added!");
          if(!this.nextPage)
            this.reloadCurrentPage();
        },
        (err) => {
          alert("An error ocurred");
          console.log(err);
        }
      )
      .add(
        () => {this.addingElement = false;}
      );
  }

  updateElement($event) {
    //TODO
  }

  deleteElement($event) {
    let id = $event;

    this.http.deleteRequest(this.controller, `${id}`)
      .subscribe(
        (data) => {
          if(this.elements.length == 1) {
            if(this.previousPage)
              this.getPreviousPage();
            else
              this.loaded = false;
          }
          else
            this.reloadCurrentPage();
        },
        (error) => {
          alert("An error ocurred.");
        }
      );
  }

  getRequest(page: number) {
    this.loading = true;

    this.http.getRequest<IResponse<IEmployee>>("Employee", `some/${page}`)
      .subscribe(
        (data) => {
          //Info loading
          this.nextPage = data.nextPage;
          this.currentPage = data.currentPage;
          this.previousPage = data.previousPage;
          this.elements = data.responseList;
          
          //
          this.loaded = this.elements.length > 0 ? true : false;
          this.error = false;
        },
        (error) => {
          this.nextPage = 1;
          this.currentPage = null;
          this.previousPage = null;

          this.error = true;
          this.loaded = false;
          this.loadTestElems();
        }
      )
      .add(() => {
        this.loading = false;
      });
  }

  reloadCurrentPage() {
    this.getRequest(this.currentPage);
  }

  getPreviousPage() {
    this.getRequest(this.previousPage); 
  }

  getNextPage() {
    this.getRequest(this.nextPage);
  }

}
