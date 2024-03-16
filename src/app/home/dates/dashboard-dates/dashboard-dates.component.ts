import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard-dates',
  templateUrl: './dashboard-dates.component.html',
  styleUrls: ['./dashboard-dates.component.css']
})
export class DashboardDatesComponent implements OnInit {
  public AssistedAppointment:any[] = [];
  public ReservedAppointment:any[] = [];
  public CanceledAppointment:any[] = [];
  public PendingAppointment:any[] = [];

  public pageCanceled:number = 1;
  public pagePending:number = 1;
  public pageAssisted:number = 1;
  public pageReserved:number = 1;
  public offsetCanceled:number = 0;
  public offsetPending:number = 0;
  public offsetAssisted:number = 0;
  public offsetReserved:number = 0;
  public nextCanceled:any ;
  public nextPending:any ;
  public previousCanceled:any ;
  public previousPending:any ;
  public previousAssisted:any ;
  public previousReserved:any ;
  public nextAssisted:any;
  public nextReserved:any;
  public limit:number = 5;
  public limitPending:number = 3;
  public complete_account:any;
  public loading:boolean = false;
  public date_id:string = '';
  public pub_test:string = '';
  public payment_url:string = '';
  public redirect_payment_url:string = '';
  public reference:string = '';
  public service_fee:number = 0;
  public service_fee_intern:number = 0;
  public amount_to_pay : number = 0;
  public search:string = '';
  constructor(private appointmentSvc:AppointmentService) { }

  ngOnInit(): void {
    this.complete_account = Number(localStorage.getItem('complete_account'));
    this.GetAssistedAppointment();
    this.GetCancelledAppointments();
    this.GetPendingAppointment();
    this.GetReservedAppointments();

  }

  GetPendingAppointment(){
    this.appointmentSvc.GetAppointment('Agendada',this.limitPending, this.offsetPending, this.search)
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                },
                next:(resp:any) => {
                  this.PendingAppointment = resp.results;
                  this.previousPending = resp.previous;
                  this.nextPending = resp.next;
                }
              })
  };

  GetCancelledAppointments(){
    this.appointmentSvc.GetAppointment('Cancelada',this.limit, this.offsetCanceled, this.search)
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                },
                next:(resp:any) => {
                  this.CanceledAppointment = resp.results;
                  this.previousCanceled = resp.previous;
                  this.nextCanceled = resp.next;
                }
              });
  };

  GetReservedAppointments(){
    this.appointmentSvc.GetAppointment('Reservada',this.limit, this.offsetReserved, this.search)
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                },
                next:(resp:any) => {
                  this.ReservedAppointment = resp.results;
                  this.previousReserved = resp.previous;
                  this.nextReserved = resp.next;
                }
              });
  };

  GetAssistedAppointment(){
    this.appointmentSvc.GetAppointment('Atendida',this.limit, this.offsetAssisted, this.search)
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                },
                next:(resp:any) => {

                  this.AssistedAppointment = resp.results;
                  this.previousAssisted = resp.previous;
                  this.nextAssisted = resp.next;
                }
              });
  };

  PaginationPending(value:number){
    this.pagePending += value;

    if(this.pagePending > 0){
      this.offsetPending = (this.limit * this.pagePending) -  this.limit;
    } else if(this.pagePending <  1){
      this.pagePending === 1;
    } else if(this.PendingAppointment.length === 0){
      this.offsetPending = (this.limit * (this.pagePending - 1)) -  this.limit;
    };
    this.GetPendingAppointment();
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

  PaginationCanceled(value:number){
    this.pageCanceled += value;

    if(this.pageCanceled > 0){
      this.offsetCanceled = (this.limit * this.pageCanceled) -  this.limit;
    } else if(this.pageCanceled <  1){
      this.pageCanceled === 1;
    } else if(this.CanceledAppointment.length === 0){
      this.offsetCanceled = (this.limit * (this.pageCanceled - 1)) -  this.limit;
    };
    this.GetCancelledAppointments();
  };

  PaginationReserved(value:number){
    this.pageReserved += value;

    if(this.pageReserved > 0){
      this.offsetReserved = (this.limit * this.pageReserved) -  this.limit;
    } else if(this.pageReserved <  1){
      this.pageReserved === 1;
    } else if(this.ReservedAppointment.length === 0){
      this.offsetReserved = (this.limit * (this.pageReserved - 1)) -  this.limit;
    };
    this.GetReservedAppointments();
  };

  Pay(service_fee:number){
    this.amount_to_pay = service_fee * 100;
    this.pub_test = environment.pub_wompi_test;
    this.redirect_payment_url = environment.redirect_url;
    this.generaNss();
    window.location.href  = `https://checkout.wompi.co/p/?public-key=${this.pub_test}&currency=COP&amount-in-cents=${this.amount_to_pay}&reference=${this.reference}&redirect-url=${this.redirect_payment_url}`;
  };

  generaNss() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < charactersLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    };
    this.reference = result.slice(0,28);

  };
}
