import { Component, OnInit, Input } from '@angular/core';
import { HttpProviderService } from '../services/http-provider/http-provider.service';
import { IEmployee } from '../models/employee-model';
import { IResponse } from '../models/api-response-model';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string; 
  
  employees: IEmployee[] = []
  nextPage?: number = 1;
  previousPage?: number = null;

  constructor(private http: HttpProviderService) {
    
  }

  ngOnInit() {
    this.getNextPage();
  }

  deleteElement(id: number){
    this.http.deleteRequest("Employee", `${id}`)
      .subscribe(
        (data) => {
          let removedElement = this.employees.find(e => e.id == id);
          let index = this.employees.indexOf(removedElement); 
          this.employees.splice(index, 1);
        },
        (error) => {console.log(error);}
      );

    
  }

  getRequest(page: number) {
    this.http.getRequest<IResponse<IEmployee>>("Employee", `some/${page}`)
      .subscribe(
        (data) => {
          
          if(!data.nextPage && !data.previousPage) {
            this.nextPage = 1;
            this.previousPage = null;
            this.employees = []
          }

          else {
            this.nextPage = data.nextPage;
            this.previousPage = data.previousPage;
            this.employees = data.responseList;
          }
          
          console.log(data);
        },
        (error) => {console.log(error);}
      );
  }

  getPreviousPage() {
    this.getRequest(this.previousPage); 
  }

  getNextPage() {
    this.getRequest(this.nextPage);
  }
  
}
