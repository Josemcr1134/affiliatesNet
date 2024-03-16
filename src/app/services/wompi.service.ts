import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WompiService {

  constructor(private http:HttpClient) { }


  GetWebCheckout(){
    const url = `https://checkout.wompi.co/p/?public-key=pub_test_0lFRLbzcrYKgi6AyL3qLBThez7I6KRki&currency=COP&amount-in-cents=14000&reference=asfdwf`;
    return this.http.get(url)
  }
}
