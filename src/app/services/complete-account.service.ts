import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompleteAccountService {

  public base_url:string =  environment.base_url;
  get header() {
    return {
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem('net_token')}`
      }
    }
  }
  constructor(private http:HttpClient) { }


  // Complete Familiy Background

  SendFamilyBackground(data:{}){
    const url = `${this.base_url}/family-background/`;
    return this.http.post(url, data , this.header);
  };

  // Complete Medical History

  SendMedicalHistory(data:{}){
    const url = `${this.base_url}/medical-history/`;
    return this.http.post(url, data, this.header);
  };


}
