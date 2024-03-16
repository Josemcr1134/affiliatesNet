import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FamilyBackground } from 'src/app/models/family-background.model';
import { CompleteAccountService } from 'src/app/services/complete-account.service';
import Swal from 'sweetalert2';
import { MedicalHistory } from '../../../models/medical-history.model';

@Component({
  selector: 'app-complete-register',
  templateUrl: './complete-register.component.html',
  styleUrls: ['./complete-register.component.css']
})
export class CompleteRegisterComponent implements OnInit {
  public familyBackground:FamilyBackground[] = [
    {
      is_cancer: false,
      is_migraine: false,
      is_insomnia: false,
      is_ulcer: false,
      is_cholesterol: false,
      is_heart_attack: false,
      is_arterial_hypertension: false,
      is_dermatitis: false,
      is_back_pain: false,
      is_headache: false,
      is_diabetes: false,
      user: Number(sessionStorage.getItem('uid'))

    }
  ];
  public medicalHistory:MedicalHistory[] = [
    {
      is_throat_problems: false,
      is_earache: false,
      is_intestinal_problems: false,
      is_depression: false,
      is_otitis: false,
      is_sleep_problems: false,
      is_drowning: false,
      is_waist_pain: false,
      is_dizziness: false,
      is_difficulty_breathing: false,
      is_articulations_pain: false,
      is_chest_pain: false,
      user: Number(sessionStorage.getItem('uid'))
    }
  ];
  public loading:boolean = false;
  constructor(private completeAccountSvc:CompleteAccountService, private router:Router) { }

  ngOnInit(): void {
  }

  SendMedicalHistory(){
    Swal.fire({
      title: '¿Quieres guardar estos cambios?',
      showDenyButton: true,

      confirmButtonText: 'Guardar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.loading = !this.loading;
        this.completeAccountSvc.SendMedicalHistory(this.medicalHistory[0])
                  .subscribe({
                    error:(err:any) => {
                      this.loading = !this.loading;
                     },
                     next:(resp:any) => {
                       this.SendFamilyBackground();
                     }
                  });
      } else if (result.isDenied) {
        Swal.fire('Cambios no fueron guardados', 'Puedes volver a revisar y enviar tus antecedentes', 'info')
      };
    });

  };

  SendFamilyBackground(){
    this.completeAccountSvc.SendFamilyBackground(this.familyBackground[0])
              .subscribe({
                error:(err:any) => {
                  this.loading = !this.loading;
                },
                next:(resp:any) => {
                  this.loading = !this.loading;
                  Swal.fire('Felicitaciones', 'Cuenta completada exitosamente', 'success');
                  this.router.navigateByUrl('/Home/Dates/AskForADate');
                  localStorage.setItem('complete_account', '100')
                }
              })
  }
}
