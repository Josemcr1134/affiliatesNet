
import { Component, OnInit } from '@angular/core';
import { DatesService } from 'src/app/services/dates.service';
import { SpecialtiesService } from 'src/app/services/specialties.service';
import 'tw-elements';
@Component({
  selector: 'app-ask-for-date',
  templateUrl: './ask-for-date.component.html',
  styleUrls: ['./ask-for-date.component.css']
})
export class AskForDateComponent implements OnInit {
  public men:number = 1;
  public bodyParts:number = 0;
  public FemaleBodyParts:number = 0;
  public limit:number = 8;
  public offset:number = 0;
  public page:number = 1;
  public ServicesPage:number = 1;
  public next:any;
  public previous:any;
  public Specialties:any[] =[];
  public Services:any[] =[];
  public specialty:string = '';
  public servicesBySpecialtyModal:boolean = false;
  public servicesOffset:number = 0;
  public servicesNext:any;
  public servicesPrevious:any;
  public search:string = '';
  constructor(private specialtiesSvc:SpecialtiesService, private datesSvc:DatesService) { }

  ngOnInit(): void {
    this.GetSpecialties();
  }

  changeGender(value:number){
    this.men = value;
  };
  showBodyParts(BodyContainer:number){
    this.bodyParts = BodyContainer;
  };

  showFemaleBodyParts(BodyContainer:number){
    this.FemaleBodyParts = BodyContainer;
  };

  showServicesBySpecialty(id:string){
    this.specialty = id;
    this.servicesBySpecialtyModal = !this.servicesBySpecialtyModal;
    this.GetServicesBySpecialty();
  };

  GetSpecialties(){
    this.specialtiesSvc.GetSpecialties(this.limit, this.offset, this.search)
                .subscribe({
                  error:(err:any) => {
                    console.log(err);
                  },
                  next:(resp:any) => {
                    this.Specialties = resp.results;
                    this.next = resp.next;
                    this.previous = resp.previous;
                  }
                });
  };


  PaginationSpecialist(value:number){
    this.page += value;

    if(this.page > 0){
      this.offset = (this.limit * this.page) -  this.limit;
    } else if(this.page <  1){
      this.page === 1;
    } else if(this.Specialties.length === 0){
      this.offset = (this.limit * (this.page - 1)) -  this.limit;
    };
    this.GetSpecialties();
  };

  GetServicesBySpecialty(){
    this.datesSvc.GetServicesBySpecialty(this.specialty, this.limit, this.servicesOffset)
          .subscribe({
            error:(err:any) => {
              console.log(err);
            },
            next:(resp:any) => {
              console.log(resp);
              this.Services  = resp.results;
              this.servicesNext = resp.next;
              this.servicesPrevious = resp.previous;
            }
          });
  };
  PaginationServices(value:number){
    this.ServicesPage += value;

    if(this.ServicesPage > 0){
      this.servicesOffset = (this.limit * this.ServicesPage) -  this.limit;
    } else if(this.ServicesPage <  1){
      this.ServicesPage === 1;
    } else if(this.Services.length === 0){
      this.servicesOffset = (this.limit * (this.ServicesPage - 1)) -  this.limit;
    };
    this.GetServicesBySpecialty();
  };
  // [routerLink]="['/Home/Dates/Specialists', s.id]"
}
