import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalFormulaComponent } from './medical-formula/medical-formula.component';
import { MedicalFormulaRoutingModule } from './medical-formula.routes';
import { MedicalFormulaDetailsComponent } from './medical-formula-details/medical-formula-details.component';
import { RelateMedicalFormulaComponent } from './relate-medical-formula/relate-medical-formula.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { DiagnosticAidsComponent } from './diagnostic-aids/diagnostic-aids.component';
import { CheckCuotesComponent } from './check-cuotes/check-cuotes.component';
import { FormsModule } from '@angular/forms';
import { NgxCaptureModule } from 'ngx-capture';


@NgModule({
  declarations: [
    MedicalFormulaComponent,
    MedicalFormulaDetailsComponent,
    RelateMedicalFormulaComponent,
    MedicinesComponent,
    DiagnosticAidsComponent,
    CheckCuotesComponent
  ],
  imports: [
    CommonModule,
    MedicalFormulaRoutingModule,
    FormsModule,
    NgxCaptureModule
  ]
})
export class MedicalFormulaModule { }
