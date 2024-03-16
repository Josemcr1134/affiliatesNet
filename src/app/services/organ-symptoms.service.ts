import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganSymptomsService {
  public base_url:string =  environment.base_url;
  get header() {
    return {
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem('net_token')}`
      }
    }
  }
  constructor(private http:HttpClient) { }

  GetSymptomsByOrganId(id_type:string){
    const url = `${this.base_url}/symptom/${id_type}/by_type`;
    return this.http.get(url, this.header);
  };

  GetSymptomsByOrganIdAndGender(organ:string, gender:string , limit:number, offset:number){
      const url = `${this.base_url}/symptom/organ/${organ}/gender/${gender}?limit=${limit}&offset=${offset}`;
    //  const url = `${this.base_url}/symptom/organ/${organ}/gender/${gender}/`;
    return this.http.get(url, this.header);
  };
}
