import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatesService } from 'src/app/services/dates.service';
import { environment } from '../../../../environments/environment.prod';
import { WompiService } from '../../../services/wompi.service';

@Component({
  selector: 'app-specialist-detail',
  templateUrl: './specialist-detail.component.html',
  styleUrls: ['./specialist-detail.component.css']
})
export class SpecialistDetailComponent implements OnInit {
    public meetType:boolean = false;
    /* Public status
          1 = Calculo
          2 = Pendiente de pago
          3 = Pagada
    */
  public steps:number = 1;
  public medical_id:string = '';
  public reference:string = '';
  public service_fee:number = 0;
  public service_fee_intern:number = 0;
  public amount_to_pay : number = 0;
  public license:string = '';
  public allyFee:string = '';
  public Dates:any[] = [];
  public reason:string = '';
  public date:string = '';
  public start_time:string = '';
  public medical_name:string = '';
  public medical_score:string = '';
  public limit:number = 12;
  public offset:number =0;
  public page:number = 1;
  public weekly_id:string = '';
  public loading:boolean = false;
  public date_id:string = '';
  public pub_test:string = '';
  public payment_url:string = '';
  public redirect_payment_url:string = '';
  public first_day:any;
  constructor( private activatedRoute:ActivatedRoute, private datesSvc:DatesService, private wompiSvc:WompiService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({medical, license, allyFee, amount, name, score }) => {
      this.medical_id = medical;
      this.service_fee = Number(amount);
      this.service_fee_intern = Number(amount);
      this.license = license;
      this.allyFee = allyFee;
      this.medical_name = name;
      this.medical_score = score;
    });
    this.amount_to_pay =  this.service_fee_intern * 100;
    this.pub_test = environment.pub_wompi_test;
    this.redirect_payment_url = environment.redirect_url;
    this.generaNss();
    this.payment_url = `https://checkout.wompi.co/p/?public-key=${this.pub_test}&currency=COP&amount-in-cents=${this.amount_to_pay}&reference=${this.reference}&redirect-url=${this.redirect_payment_url}`;
    this.first_day = new Date();
    this.first_day = this.first_day.toISOString();
    this.first_day = this.first_day.slice(0,10)
  };


  GetDates(type:boolean){
  this.datesSvc.GetDatesByMedicalAndMeetType(this.medical_id, type, this.limit, this.offset, this.first_day)
          .subscribe({
            error:(err:any) => {
              console.log(err);
            },
            next:(resp:any) => {
              if (this.steps === 1) {
                this.steps = this.steps + 1;
              }
              this.meetType = type;
              this.Dates =   resp.results.filter((date:any) => date.is_telemedicine === type && date.status === 'AVAILABLE' );
            }
          })
  };

  PaginationDates(value:number){
    this.page += value;

    if(this.page > 0){
      this.offset = (this.limit * this.page) -  this.limit;
    } else if(this.page <  1){
      this.page === 1;
    } else if(this.Dates.length === 0){
      this.offset = (this.limit * (this.page - 1)) -  this.limit;
    };
    this.GetDates((this.meetType));
  };

  generaNss() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < charactersLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    };
    this.reference = result.slice(0,28);
    if (this.steps === 4) {
      this.steps = this.steps - 1
    };
  };

  SelectAdate(date:string = 'xx', start_time:string, weekly:string = ''){
    this.loading = !this.loading;
    this.steps = this.steps + 1;
    this.date  = date;
    this.start_time = start_time;
    this.weekly_id = weekly;
    this.loading = !this.loading;
  };

  NewAppointment(){
    this.loading = !this.loading;
    const body = {
      medical_specialty: this.license,
      ally_fee: this.allyFee,
      is_telemedicine: this.meetType,
      payment_reference: this.reference,
      reason_for_consultation: this.reason,
      service_type: 'consultation',
      weekly:this.weekly_id
    };

    this.datesSvc.NewAppointment(body)
          .subscribe({
            error:(err:any) => {
              console.log(err,body);
            },
            next:(resp:any) => {
              this.steps = this.steps + 1;
              localStorage.setItem('date_id', resp.id)
            }
          })
          this.loading = !this.loading;

  };

}
