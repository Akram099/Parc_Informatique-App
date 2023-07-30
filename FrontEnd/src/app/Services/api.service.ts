import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseurl: string = 'https://localhost:7211/api/Fonctionnaire/authenticate';
  constructor(private http : HttpClient) { }

  getUsers(){
    return this.http.get<any>(this.baseurl);
  }
}
