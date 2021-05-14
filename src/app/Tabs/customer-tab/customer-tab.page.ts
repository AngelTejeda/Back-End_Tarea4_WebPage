import { Component } from '@angular/core';
import { IResponse } from 'src/app/Models/api-response-model';
import CustomerModels from 'src/app/models/customer-models';
import { HttpProviderService } from 'src/app/Services/http-provider/http-provider.service';

@Component({
  selector: 'app-customer-tab',
  templateUrl: 'customer-tab.page.html',
  styleUrls: ['customer-tab.page.scss']
})
export class CustomerTab {
  name = "Customer";
  iconAdd = "person-add"

  // API Response values
  employees: CustomerModels.ICustomer[] = []
  nextPage?: number = null;
  currentPage?: number = null;
  previousPage?: number = null;

  // Navigation helpers
  loaded: boolean = false;
  error: boolean = false;
  loading: boolean = false;
  addingElement: boolean = false;

  constructor(private http: HttpProviderService) { }

  ngOnInit() {
    this.getPage(1);
  }

  //////////////////////////////////

  // NOTA: Cambiar los alerts por algún cuadro de diálogo que salga por unos segundos y se vuelva a ocultar
  // pero que el usuario no tenga que quitar manualmente.

  //////////////////////////////////


  // HTTP REQUESTS //

  getPage(page: number) {
    this.loading = true;

    this.http.getRequest<IResponse<CustomerModels.ICustomer>>(this.name, `pages/${page}`)
      .subscribe(
        (data) => {
          // Load info from the response.
          this.nextPage = data.nextPage;
          this.currentPage = data.currentPage;
          this.previousPage = data.previousPage;
          this.employees = data.responseList;
          
          // Check if the response list is not empty.
          this.loaded = this.employees.length > 0 ? true : false;

          // The API responded succesfully
          this.error = false;
        },
        (error) => {
          // Reset values
          this.nextPage = null;
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
      console.log(this.employees)
  }


  addElement() {
    this.addingElement = true;

    // Esta información viene de un forms.
    let employee: CustomerModels.ICustomerPost = {
      id: "ID",
      company: "Una compañia",
      contactFullName: "Un nombre completo",
      contactPosition: "Un puesto",
      contactPhone: "0000",
    }

    this.http.postRequest(this.name, employee)
      .subscribe(
        (data) => {
          alert("Successfully Added!");

          // If we are in the last page, reload to show the "Next Page" button.
          if(!this.nextPage)
            this.reloadCurrentPage();
        },
        (err) => {
          alert("An error ocurred while adding the employee.");

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
    let employee: CustomerModels.ICustomerPut = {
      company: "Una compañia",
      contactFullName: "Un nombre completo",
      contactPosition: "Un puesto",
      contactPhone: "0000",
    }
    
    this.http.putRequest(this.name, id.toString(), employee)
      .subscribe(
        (data) => {
          alert("Successfully Modified!");

          // Reload the page to show the changes.
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

    this.http.deleteRequest(this.name, `${id}`)
      .subscribe(
        (data) => {
          // If the deleated employee is the las employee of the page.
          if(this.employees.length == 1) {
            // If there is a previous page, go back.
            if(this.previousPage)
              this.getPreviousPage();
            
            // If there is not a previous page, but there is a next page, go next.
            else if(this.nextPage)
              this.getNextPage();
            
            // Otherwise, there are no more elements to show
            else {
              this.nextPage = null;
              this.currentPage = null;
              this.previousPage = null;

              this.loaded = false;
            }
          }

          // Otherwise, reload the page to show the changes.
          else
            this.reloadCurrentPage();
        },
        (error) => {
          alert("An error ocurred.");
        }
      );
  }


  // NAVIGATION //
  reloadCurrentPage() {
    this.getPage(this.currentPage);
  }

  getPreviousPage() {
    this.getPage(this.previousPage); 
  }

  getNextPage() {
    this.getPage(this.nextPage);
  }
}
