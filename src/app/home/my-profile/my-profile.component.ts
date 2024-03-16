import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  public uid:string = '';
  public name:string = '';
  public lastName:string = '';
  public idType:string = '';
  public idNumber:string = '';
  public email:string = '';
  public phone:string = '';
  public gender:string = '';
  public civilStatus:string = '';
  public birthday:string = '';
  public address:string = '';
  public addressDetail:string = '';
  public neighborhood:string = '';
  public country:string = '';
  public city:string = '';
  public dpt:string = '';
  constructor(private authSvc:AuthService) { }

  ngOnInit(): void {
    this.uid = sessionStorage.getItem('uid') || '';
    this.getAffiliate();
  }

  getAffiliate(){
    this.authSvc.GetUser(this.uid)
          .subscribe({
            error:(err:any) => {
              console.log(err);
            },
            next:(resp:any) => {
              this.name = resp.first_name;
              this.lastName = resp.last_name;
              this.idType = resp.document_type;
              this.idNumber = resp.document;
              this.email = resp.email;
              this.phone = resp.phone_number;
              this.gender = resp.gender;
             this.birthday =  resp.affiliate.birthdate;
             this.civilStatus =  resp.affiliate.marital_status;
             this.address = resp.address[0].name;
             this.addressDetail = resp.address[0].address_detail;
             this.neighborhood = resp.address[0].neighborhood.name;
             this.country = resp.address[0].neighborhood.municipality.department.country.name;
              this.dpt = resp.address[0].neighborhood.municipality.department.name
              this.city = resp.address[0].neighborhood.municipality.name

            }
          })
  }
}
