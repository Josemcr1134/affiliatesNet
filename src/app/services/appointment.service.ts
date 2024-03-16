import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  public base_url:string =  environment.base_url;
  get header() {
    return {
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem('net_token')}`
      }
    }
  }

  constructor(private http:HttpClient) { }


  GetNextAppointment(){
    const url = `${this.base_url}/appointment/next_appointment/`;
    return this.http.get(url, this.header);
  };

  GetAppointment(status:string, limit:number, offset:number, search:string){
    const url = `${this.base_url}/appointment/appointment_by_affiliate/?status=${status}&limit=${limit}&offset=${offset}&search=${search}`;
    return this.http.get(url, this.header);
  };


  GetAppointmentById(id:string){
    const url = `${this.base_url}/appointment/${id}/`;
    return this.http.get(url, this.header);
  };


}
