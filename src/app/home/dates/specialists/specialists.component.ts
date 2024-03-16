import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatesService } from 'src/app/services/dates.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-specialists',
  templateUrl: './specialists.component.html',
  styleUrls: ['./specialists.component.css']
})
export class SpecialistsComponent implements OnInit {
  public Medicals:any[] = [];
  public page:number = 1;
  public limit:number = 8;
  public offset:number = 0;
  public next:any;
  public previous:any;
  public service:string = '';
  public day:number = 0;
  public start_time:string = '';
  public medical_id:string = '';
  public duration:number = 1;
  public show:boolean = false;
  public end_time:string = '';
  public date_id:string = '';
  public pub_test:string = '';
  public payment_url:string = '';
  public amount_to_pay:number = 0;
  public reference:string= '';
  public steps:number = 0;
  public loading:boolean = false;
  public redirect_url:string ='';

  constructor(private datesSvc:DatesService , private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      this.service = id;

    });
    this.GetMedicals();
    this.pub_test = environment.pub_wompi_test;
    this.redirect_url = environment.redirect_url;
  }

  GetMedicals(){
    this.datesSvc.GetMedicalsByService(this.service, this.limit, this.offset)
                  .subscribe({
                    error:(err:any) => {
                      console.log(err);
                    },
                    next:(resp:any) => {
                      this.Medicals = resp;
                    }
                  })
  };

  PaginationMedicals(value:number){
    this.page += value;

    if(this.page > 0){
      this.offset = (this.limit * this.page) -  this.limit;
    } else if(this.page <  1){
      this.page === 1;
    } else if(this.Medicals.length === 0){
      this.offset = (this.limit * (this.page - 1)) -  this.limit;
    };
    this.GetMedicals();
  };

  GetNextAvaibleDate(is_telemedicine:boolean, medical_id:string, fee:number, license:string, allyFee:string){
    this.loading = !this.loading;

    this.day =0;
    this.datesSvc.GetNextAvaibleDate(is_telemedicine, medical_id)
          .subscribe({
            error:(err:any) => {
              this.show = !this.show;
              this.loading = !this.loading;

              console.log(this.show);
            },
            next:(resp:any) => {
              this.medical_id = resp.user;
              this.start_time = resp.start_time;
              this.day = resp.day;
              this.end_time = resp.end_time;
              this.amount_to_pay = fee * 100;
              this.generaNss();

              setTimeout(() => {
                this.NewAppointment(license, allyFee, is_telemedicine, resp.id);

              }, 2500);
            }
          });
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

      this.payment_url = `https://checkout.wompi.co/p/?public-key=${this.pub_test}&currency=COP&amount-in-cents=${this.amount_to_pay}&reference=${this.reference}&redirect-url=${this.redirect_url}`;

    };

  NewAppointment(license:string, allyFee:string, meetType:boolean, weekly_id:string){
    const body = {
      medical_specialty: license,
      ally_fee: allyFee,
      is_telemedicine: meetType,
      payment_reference: this.reference,
      reason_for_consultation: 'reason',
      service_type: 'consultation',
      weekly:weekly_id
    };

    this.datesSvc.NewAppointment(body)
          .subscribe({
            error:(err:any) => {
              this.loading = !this.loading;
            },
            next:(resp:any) => {
              this.show = !this.show;
              localStorage.setItem('date_id', resp.id);
              this.loading = !this.loading;
            }
          })


  };



}
