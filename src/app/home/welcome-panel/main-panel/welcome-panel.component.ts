import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { IndicatorsService } from 'src/app/services/indicators.service';
import 'tw-elements';
@Component({
  selector: 'app-welcome-panel',
  templateUrl: './welcome-panel.component.html',
  styleUrls: ['./welcome-panel.component.css']
})
export class WelcomePanelComponent implements OnInit {
  public first_name:string = '';
  public last_name:string = '';
  public avatar:any ;
  public medic_name:string = '';
  public medic_specialty:string = '';
  public appointment_date:string = '';
  public appointment_day:string = '';
  public appointment_type:boolean = false;
  public appointment_location:string ='' ;
  public appointment_location_detail:string = '';

  public completed_appointment:number = 0;
  public consulted_specialty:number = 0;
  public financial_info:any = 0;
  public medical_info:any = 0;
  public pending_appointment:number = 0;
  public register_process:any = 0;
  public bundle:any = 0;
  public countOrdering:number = 0;
  constructor( private appointmentSvc:AppointmentService, private indicatorsSvc:IndicatorsService) { }

  ngOnInit(): void {
    this.first_name = sessionStorage.getItem('first_name') || '';
    this.last_name = sessionStorage.getItem('last_name') || '';
    this.avatar = sessionStorage.getItem('avatar') || null;
    this.GetNextAppointment();
    this.GetIndicators();
    this.GetAssistedAppointment();
  }

  GetNextAppointment(){
    this.appointmentSvc.GetNextAppointment()
              .subscribe({
                error:(err:any) => {
                   console.log(err);
                },
                next:(resp:any)=> {

                  this.medic_name = `${resp.medical_specialty.medical.first_name} ${resp.medical_specialty.medical.last_name}`;
                  this.appointment_date = resp.date;
                  this.appointment_type = resp.is_telemedicine;
                  this.appointment_location = resp.location.name;
                  this.appointment_location_detail = resp.location.address_detail

                }
              })
  };

  GetIndicators(){
    this.indicatorsSvc.GetIndicators()
            .subscribe({
              error:(err:any) => {
                console.log(err);
              },
              next:(resp:any) => {
                console.log(resp);
                this.completed_appointment = resp.completed_appointment;
                this.consulted_specialty = resp.consulted_specialties;
                this.financial_info = `${resp.financial_information}%`;
                this.medical_info = `${resp.medical_information}%`;

                 this.pending_appointment = resp.pending_appointment;
                 this.register_process = `${resp.registration_process}%`;
                 this.bundle = `${resp.total}%`;

                 localStorage.setItem('complete_account', resp.total);
              }
            });
  };

  GetAssistedAppointment(){
    this.appointmentSvc.GetAppointment('Atendida', 10, 0, '')
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                },
                next:(resp:any) => {
                  console.log(resp);

                  this.countOrdering = resp.count;

                }
              });
  };
}
