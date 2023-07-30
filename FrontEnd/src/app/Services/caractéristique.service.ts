import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { caracteristique } from '../models/Caractéristique';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaractéristiqueService {
  GetMarché() {
    throw new Error('Method not implemented.');
  }

  constructor(private httpclient : HttpClient) { }

  private baseurl = "https://localhost:7211/api/Caractéristique";

  GetCaractéristique() : Observable<caracteristique[]> {
    return this.httpclient.get<caracteristique[]>(this.baseurl)
  }
}
