import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MedicalFormulaComponent } from './medical-formula/medical-formula.component';
import { MedicalFormulaDetailsComponent } from './medical-formula-details/medical-formula-details.component';
import { RelateMedicalFormulaComponent } from './relate-medical-formula/relate-medical-formula.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { DiagnosticAidsComponent } from './diagnostic-aids/diagnostic-aids.component';
import { CheckCuotesComponent } from './check-cuotes/check-cuotes.component';



const routes: Routes = [
    { path: '', children: [
        {path:'UserMedicalFormula', component:MedicalFormulaComponent},
        {path:'UserMedicalFormulaDetail/:aid', component:MedicalFormulaDetailsComponent},
        {path:'RelateMedicalFormula', component:RelateMedicalFormulaComponent},
        {path:'Medicines', component:MedicinesComponent},
        {path:'DiagnosticAids', component:DiagnosticAidsComponent},
        {path:'CheckQuotes', component:CheckCuotesComponent},
    ] },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MedicalFormulaRoutingModule {}
