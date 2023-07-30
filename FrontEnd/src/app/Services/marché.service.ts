import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { marché } from '../models/Marché';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarchéService {

  constructor(private httpclient : HttpClient) { }

  private baseurl = "https://localhost:7211/api/Marché";

  GetMarché() : Observable<marché[]> {
    return this.httpclient.get<marché[]>(this.baseurl)
  }

  Marché(num_Marche: string) : Observable<marché> {
    return this.httpclient.get<marché>(this.baseurl + '/' + num_Marche)
  }

  CreateMarché(addmarcheRequest : marché) : Observable<marché>{
    addmarcheRequest.num_Marche = '00000';
    return this.httpclient.post<marché>(this.baseurl, addmarcheRequest);
  }
  
  updateMarché(num_Marche : string, updatemarcheRequest: marché) : Observable<marché>{
    return this.httpclient.put<marché>(this.baseurl+ '/' + num_Marche, updatemarcheRequest);
  }

  DeleteMarché(num_Marche: string) : Observable<marché>{
    return this.httpclient.delete<marché>(this.baseurl+ '/' +num_Marche);
  }

}
