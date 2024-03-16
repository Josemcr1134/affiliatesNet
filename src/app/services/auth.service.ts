import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public base_url:string =  environment.base_url;
  get header() {
    return {
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem('net_token')}`
      }
    }
  }
  constructor(private http:HttpClient) { }

  Login(data:{}){
    const url = `${this.base_url}/login/`;
    return this.http.post(url, data);
  };

  ChangePassword(data:{}){
    const url = `${this.base_url}/password/change/`;
    return this.http.post(url, data);
  };

    // CHANGE PASSWORD FLUID

  // 1. Send email code
  ResetPassword(data:{}){
    const url = `${this.base_url}/password/reset/`;
    return this.http.post(url, data);
  };

  // 2. Confirm New Password

  ConfirmNewPassword(data:{}){
    const url = `${this.base_url}/password/reset/confirm/`;
    return this.http.post(url, data);
  };

  // 3. Get user info

  GetUser(uid:string ) {
    const url = `${this.base_url}/affiliates/${uid}/`;
    return this.http.get(url, this.header);
  };

}
