import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecialtiesService {

  public base_url:string =  environment.base_url;
  get header() {
    return {
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem('net_token')}`
      }
    }
  }
  constructor(private http:HttpClient) { }


  GetSpecialties(limit:number, offset:number, search:string){
    const url =  `${this.base_url}/specialty/?limit=${limit}&offset=${offset}&search=${search}`;
    return this.http.get(url, this.header);
  }


}
