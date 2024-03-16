import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardDatesComponent } from './dashboard-dates/dashboard-dates.component';
import { AskForDateComponent } from './ask-for-date/ask-for-date.component';
import { SpecialistsComponent } from './specialists/specialists.component';
import { SymptomsComponent } from './symptoms/symptoms.component';
import { SpecialistDetailComponent } from './specialist-detail/specialist-detail.component';
import { CompleteRegisterComponent } from './complete-register/complete-register.component';
import { AssistDateComponent } from './assist-date/assist-date.component';
import { SuccessPaymentComponent } from './success-payment/success-payment.component';


const routes: Routes = [
    { path: '',
        children:[
            {path:'AskForADate', component:AskForDateComponent},
            {path:'AssistDate', component:AssistDateComponent},
            {path:'CompleteRegister', component:CompleteRegisterComponent},
            {path:'MyDates', component:DashboardDatesComponent},
            {path:'Specialists/:id', component:SpecialistsComponent},
            {path:'SpecialistDetail/:medical/:license/:allyFee/:amount/:name/:score', component:SpecialistDetailComponent},
            {path:'Symptoms/:gender/:bodyPart/:IdBodyPart', component:SymptomsComponent},
            {path:'SuccessPayment', component:SuccessPaymentComponent},
            { path: '**', redirectTo:'MyDates', pathMatch:'full'}
        ]

    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DatesRoutingModule {}
