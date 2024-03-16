import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  public base_url:string =  environment.base_url;
  get header() {
    return {
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem('net_token')}`
      }
    }
  }
  constructor(private http:HttpClient) { }

  GetServicesBySpecialty(specialty: string, limit:number,offset:number){
    const url = `${this.base_url}/service/specialty/${specialty}/?limit=${limit}&offset=${offset}`;
    return this.http.get(url, this.header);
  };

  GetMedicalsByService(service: string, limit:number,offset:number){
    const url = `${this.base_url}/search/by_service/${service}/?limit=${limit}&offset=${offset}`;
    return this.http.get(url, this.header);
  };

  GetMedicalsBySymptoms(data:{}){
    const url = `${this.base_url}/search/by_symptoms/${data}/`;
    return this.http.get(url, this.header);
  };

  GetNextAvaibleDate(is_telemedicine:boolean, medical_id:string){
    const url = `${this.base_url}/weekly-program-event/get_next_date/?is_telemedicine=${is_telemedicine}&user_id=${medical_id}`;
    return this.http.get(url, this.header);
  };

  GetDatesByMedicalAndMeetType(medical:string , is_Telemedicine:boolean, limit:number, offset:number, first_date:string) {
     const url = `${this.base_url}/weekly-program-event/?user_id=${medical}&limit=${limit}&offset=${offset}&first_date=${first_date}`;
     return this.http.get(url, this.header);
  };

  GetMedical(id:string) {
    const url = `${this.base_url}/users/${id}/`;
    return this.http.get(url, this.header);
  };

  NewAppointment(data:{}){
    const url = `${this.base_url}/appointment/schedule/`;
    return this.http.post(url, data, this.header);
  };

  GetDatesBySymptoms(data:{}, offset:number, limit:number){
    const url = `${this.base_url}/speciality-symptom/?offset=${offset}&limit=${limit}`;
    return this.http.get(url, data);
  }

}
