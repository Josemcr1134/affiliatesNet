import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxStarRatingModule } from 'ngx-star-rating';

import { DatesRoutingModule } from './dates.routes';
import { DashboardDatesComponent } from './dashboard-dates/dashboard-dates.component';
import { AskForDateComponent } from './ask-for-date/ask-for-date.component';
import { SpecialistsComponent } from './specialists/specialists.component';
import { SymptomsComponent } from './symptoms/symptoms.component';
import { SpecialistDetailComponent } from './specialist-detail/specialist-detail.component';
import { CompleteRegisterComponent } from './complete-register/complete-register.component';
import { AssistDateComponent } from './assist-date/assist-date.component';
import { SuccessPaymentComponent } from './success-payment/success-payment.component';


@NgModule({
  declarations: [
    DashboardDatesComponent,
    AskForDateComponent,
    SpecialistsComponent,
    SymptomsComponent,
    SpecialistDetailComponent,
    CompleteRegisterComponent,
    AssistDateComponent,
    SuccessPaymentComponent
  ],
  imports: [
    CommonModule,
    DatesRoutingModule,
    NgxStarRatingModule,
    FormsModule
  ]
})
export class DatesModule { }
