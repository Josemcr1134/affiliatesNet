import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-success-payment',
  templateUrl: './success-payment.component.html',
  styleUrls: ['./success-payment.component.css']
})
export class SuccessPaymentComponent implements OnInit {
  public appointment_id:string = '';
  constructor(private appointmentSvc:AppointmentService) { }

  ngOnInit(): void {
    this.appointment_id = localStorage.getItem('date_id') || '';
    this.GetAppointmentById();
  }

  GetAppointmentById(){
    this.appointmentSvc.GetAppointmentById(this.appointment_id)
                .subscribe({
                  error:(err:any) => {
                    console.log(err);
                  },
                  next:(resp:any) => {
                    console.log(resp);
                  }
                })
  }

}
