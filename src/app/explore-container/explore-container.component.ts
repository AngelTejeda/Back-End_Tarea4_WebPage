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

  response: IResponse<IEmployee> = {
    previousPage: null,
    nextPage: 1,
    responseList: []
  }
  currentPage: number = 1;

  constructor(private http: HttpProviderService) {
    
  }

  ngOnInit() {
    this.nextPage();
  }

  deleteElement(){
    alert("Hola");
  }

  getRequest(page: number) {
    this.http.getRequest<IResponse<IEmployee>>("Employee", `some/${page}`)
      .subscribe(
        (data) => {
          this.response = data;

          if(data.nextPage == null && data.previousPage == null)
            this.currentPage = 1;
          else
            this.currentPage = page;
          
          console.log(data);
        },
        (error) => {console.log(error);}
      );
  }

  previousPage() {
    this.getRequest(this.response.previousPage); 
  }

  nextPage() {
    this.getRequest(this.response.nextPage);
  }
  
}
