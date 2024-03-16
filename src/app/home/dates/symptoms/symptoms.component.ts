import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganSymptomsService } from 'src/app/services/organ-symptoms.service';
import { DatesService } from '../../../services/dates.service';

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.component.html',
  styleUrls: ['./symptoms.component.css']
})
export class SymptomsComponent implements OnInit {

  public gender:string = '';
  public bodyPart!:string;
  public MaleBodyPart:string = '';
  public FemaleBodyPart:string = '';
  public organId:string = '';
  public limit: number = 8;
  public offset: number = 0;
  public limitSpecialties: number = 4;
  public offsetSpecialties: number = 0;
  public page:number = 1;
  public Symptoms:any[] = [];
  public SymptomsSelected:any [] = [];
  public next:any;
  public previous:any;
  public nextSpecialties:any;
  public previousSpecialties:any;
  public Specialties:any[] = [];
  public servicesNext:any;
  public servicesPrevious:any;
  public servicesPage:number =1;
  public servicesOffset:number =0;
  public Services:any[] = [];
  public specialty:string = '';
  public servicesBySpecialtyModal:boolean = false;
  public loading:boolean = false;
  constructor( private activatedRoute:ActivatedRoute, private organSymptomsSvc:OrganSymptomsService, private datesSvc:DatesService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({gender,  bodyPart, IdBodyPart}) => {
      this.gender = gender;
      this.bodyPart = bodyPart;
      this.organId = IdBodyPart;
    });
    this.MaleBodyPart = `assets/images/MaleBodyParts/${this.bodyPart}.png`;
    this.FemaleBodyPart = `assets/images/FemaleBodyParts/${this.bodyPart}.png`;
    console.log(this.gender, this.bodyPart, this.FemaleBodyPart, this.organId);
    this.GetSymptomsByOrganIdAndGender();
  }


  GetSymptomsByOrganIdAndGender(){
    this.organSymptomsSvc.GetSymptomsByOrganIdAndGender(this.organId, this.gender.toLowerCase(), this.limit, this.offset)
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                } ,
                next:(resp:any) => {
                  this.Symptoms =  resp.results;
                  this.next = resp.next;
                  this.previous = resp.previous;
                }
              })
  };

  SelectSymptom(id:string){
    const s =  id
    if (this.SymptomsSelected.find((sp:any) => sp === s)) {
      this.SymptomsSelected.splice(this.SymptomsSelected.indexOf(s), 1);
    } else {
      this.SymptomsSelected.push(s);
    };
  };

  PaginationSymptoms(value:number){
    this.page += value;

    if(this.page > 0){
      this.offset = (this.limit * this.page) -  this.limit;
    } else if(this.page <  1){
      this.page === 1;
    } else if(this.Symptoms.length === 0){
      this.offset = (this.limit * (this.page - 1)) -  this.limit;
    };
    this.GetSymptomsByOrganIdAndGender();
  };

  showServicesBySpecialty(id:string){
    this.specialty = id;
    this.servicesBySpecialtyModal = !this.servicesBySpecialtyModal;
    this.GetServicesBySpecialty();
  };

  GetSpecialtiesBySymptoms(){
    const body = {
      symptom_list:this.SymptomsSelected
    };

    this.datesSvc.GetDatesBySymptoms(body, this.offset, this.limit)
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                },
                next:(resp:any) => {
                  this.nextSpecialties = resp.next;
                  this.previousSpecialties = resp.previous;
                  this.Specialties = resp.results;
                }
              });
  };

  GetServicesBySpecialty(){
    this.datesSvc.GetServicesBySpecialty(this.specialty, this.limit, this.servicesOffset)
          .subscribe({
            error:(err:any) => {
              console.log(err);
            },
            next:(resp:any) => {
              this.Services  = resp.results;
              this.servicesNext = resp.next;
              this.servicesPrevious = resp.previous;
            }
          });
  };

  PaginationServices(value:number){
    this.servicesPage += value;
    this.servicesOffset += value;

    if(this.servicesPage > 0){
      this.servicesOffset = (this.limit * this.servicesPage) -  this.limit;
    } else if(this.servicesPage <  1){
      this.servicesOffset === 1;
    } else if(this.Services.length === 0){
      this.servicesOffset = (this.limit * (this.servicesOffset - 1)) -  this.limit;
    };
    this.GetServicesBySpecialty();
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
    this.GetSpecialtiesBySymptoms();
  };
}
