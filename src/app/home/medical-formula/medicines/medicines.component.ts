import { Component, OnInit } from '@angular/core';
import { MedicalFormulasService } from '../../../services/medical-formulas.service';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})
export class MedicinesComponent implements OnInit {
  public uid:string = '';
  public Medicines:any[] = [];
  public page:number = 1;
  public offset:number = 0 ;
  public limit:number = 10;
  public next:any;
  public previous:any;

  constructor(private medicalFormulaSvc:MedicalFormulasService) { }

  ngOnInit(): void {
    this.uid = localStorage.getItem('uid') || '';
    this.GetMedicines();
  }

  GetMedicines(){
    this.medicalFormulaSvc.GetVademecumHistory(this.uid, this.limit, this.offset)
                .subscribe({
                  error:(err:any) => {
                    console.log(err);
                  },
                  next:(resp:any) => {
                    this.Medicines = resp.results;
                    this.next = resp.next;
                    this.previous = resp.previous;
                  }
                });
  };

  Pagination(value:number){
    this.page += value;

    if(this.page > 0){
      this.offset = (this.limit * this.page) -  this.limit;
    } else if(this.page <  1){
      this.page === 1;
    } else if(this.Medicines.length === 0){
      this.offset = (this.limit * (this.page - 1)) -  this.limit;
    };
    this.GetMedicines();
  };
}
