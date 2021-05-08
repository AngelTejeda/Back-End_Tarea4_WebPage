import { Component, OnInit, Input } from '@angular/core';
import { HttpProviderService } from '../Services/http-provider/http-provider.service';
import { IEmployee } from '../Models/employee-model';
import { IResponse } from '../Models/api-response-model';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string; 
  
  employees: IEmployee[] = []
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

  addElement() {
    this.addingElement = true;

    let employee: IEmployee = {
      homeAddress: "Una casa",
      name: "Un nombre",
      familyName: "Un apellido"
    }

    this.http.postRequest("Employee", employee)
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

    this.http.deleteRequest("Employee", `${id}`)
      .subscribe(
        (data) => {
          if(this.employees.length == 1) {
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

    this.http.getRequest<IResponse<IEmployee>>("Employee", `pages/${page}`)
      .subscribe(
        (data) => {
          //Info loading
          this.nextPage = data.nextPage;
          this.currentPage = data.currentPage;
          this.previousPage = data.previousPage;
          this.employees = data.responseList;
          
          //
          this.loaded = this.employees.length > 0 ? true : false;
          this.error = false;
        },
        (error) => {
          this.nextPage = 1;
          this.currentPage = null;
          this.previousPage = null;

          this.error = true;
          this.loaded = false;
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
