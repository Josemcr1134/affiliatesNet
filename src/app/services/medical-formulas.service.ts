import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicalFormulasService {

  public base_url:string =  environment.base_url;
  get header() {
    return {
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem('net_token')}`
      }
    }
  }
  constructor(private http:HttpClient) { }


  GetMedicalFormulasDetail(appointment_id:string){
    const url = `${this.base_url}/appointment/get_order/?appointment=${appointment_id}`;
    return this.http.get(url, this.header);
  };

  GetVademecumHistory(user:string, limit:number, offset:number){
    const url = `${this.base_url}/appointment-vademecum/${user}?limit=${limit}&offset=${offset}`;
    return this.http.get(url, this.header);
  };
}
