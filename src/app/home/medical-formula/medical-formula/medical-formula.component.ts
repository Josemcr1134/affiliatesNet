import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-medical-formula',
  templateUrl: './medical-formula.component.html',
  styleUrls: ['./medical-formula.component.css']
})
export class MedicalFormulaComponent implements OnInit {
  public AssistedAppointment:any[] = [];
  public pageAssisted:number = 1;
  public offsetAssisted:number = 0;
  public limit:number = 5;
  public previousAssisted:any ;
  public nextAssisted:any;
  public uid:string = '';
  public search:string = '';
  constructor(private appointmentSvc:AppointmentService) { }

  ngOnInit(): void {
    this.uid = sessionStorage.getItem('uid') || '';
    this.GetAssistedAppointment();
  }

  GetAssistedAppointment(){
    this.appointmentSvc.GetAppointment('Atendida',this.limit, this.offsetAssisted, this.search)
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                },
                next:(resp:any) => {
                  console.log(resp);

                  this.AssistedAppointment = resp.results;
                  this.previousAssisted = resp.previous;
                  this.nextAssisted = resp.next;
                }
              });
  };


  PaginationAssisted(value:number){
    this.pageAssisted += value;

    if(this.pageAssisted > 0){
      this.offsetAssisted = (this.limit * this.pageAssisted) -  this.limit;
    } else if(this.pageAssisted <  1){
      this.pageAssisted === 1;
    } else if(this.AssistedAppointment.length === 0){
      this.offsetAssisted = (this.limit * (this.pageAssisted - 1)) -  this.limit;
    };
    this.GetAssistedAppointment();
  };
}
