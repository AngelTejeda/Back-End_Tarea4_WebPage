import { Component, OnInit, Input } from '@angular/core';
import { HttpProviderService } from '../Services/http-provider/http-provider.service';
import { EmployeeModels } from '../Models/employee-models';
import { IResponse } from '../Models/api-response-model';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string; 
  
  employees: EmployeeModels.IEmployee[] = []
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

    let employee: EmployeeModels.IEmployeePost = {
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
    let id = $event;

    // Esta información vendría del formulario
    let employee: EmployeeModels.IEmployeePut = {
      homeAddress: "Casita 2",
      name: "Nombre 2",
      familyName: "Apellido 2"
    }
    
    this.http.putRequest("Employee", id.toString(), employee)
      .subscribe(
        (data) => {
          alert("Successfully Modified!");
          this.reloadCurrentPage();
        },
        (err) => {
          alert("An error ocurred while updating");
          console.log(err);
        }
      );
  }

  deleteElement($event) {
    let id = $event;

    this.http.deleteRequest("Employee", `${id}`)
      .subscribe(
        (data) => {
          if(this.employees.length == 1) {
            if(this.previousPage)
              this.getPreviousPage();
            else if(this.nextPage)
              this.getNextPage();
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

    this.http.getRequest<IResponse<EmployeeModels.IEmployee>>("Employee", `pages/${page}`)
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

          console.log(error);
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
