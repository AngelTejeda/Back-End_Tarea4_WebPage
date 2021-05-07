import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {
  
  baseUrl : string = "https://localhost:44310/api/"
  corsHeaders : HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });


  constructor(private http: HttpClient) { }

  getRequest<T>(component: string, endpoint: string = "", bodyParams?: HttpParams) {
    let url = this.baseUrl + component + "/" + endpoint;
    
    return this.http.get<T>(url, {params: bodyParams});
  }

  postRequest(component: string, endpoint: string = "", bodyParams?: HttpParams) {
    let url = this.baseUrl + component + "/" + endpoint;

    return this.http.post(url, {params: bodyParams});
  }

  putRequest(component: string, endpoint: string = "", bodyParams?: HttpParams) {
    let url = this.baseUrl + component + "/" + endpoint;

    return this.http.put(url, {params: bodyParams});
  }

  deleteRequest(component: string, endpoint: string = "", bodyParams?: HttpParams) {
    let url = this.baseUrl + component + "/" + endpoint;

    return this.http.delete(url, {params: bodyParams});
  }
}
