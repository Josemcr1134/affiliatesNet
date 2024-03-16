import { Component, OnInit, ViewChild } from '@angular/core';
import { MedicalFormulasService } from '../../../services/medical-formulas.service';
import { ActivatedRoute } from '@angular/router';

import { NgxCaptureService } from 'ngx-capture';
import { DomSanitizer } from '@angular/platform-browser';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-medical-formula-details',
  templateUrl: './medical-formula-details.component.html',
  styleUrls: ['./medical-formula-details.component.css']
})
export class MedicalFormulaDetailsComponent implements OnInit {
  public appointment_id:string ='';
  public specialty_name:string = '';
  public medical_name:string = '';
  public service_date:string = '';
  public anamnesis:any[] = [];
  public internal_notes:string = '';
  public reason_for_consultation:string = '';
  public recommendations:string = '';
  public diagnosis:string = '';
  public analysis_and_plan:string = '';
  public service_type:string = '';
  public observations:string = '';
  public Medicines:any[] = [];
  public start_date_inhability:string = '';
  public end_date_inhability:string = '';
  public order:any;
  public Orders:any[] = [];
  public isCaptured:boolean = false;
  @ViewChild('screen', { static: true }) screen: any;
  public signatureImage:string = '';
  constructor(private medicalFormulaSvc:MedicalFormulasService, private activatedRoute:ActivatedRoute, private captureService:NgxCaptureService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({aid}) => {
      this.appointment_id = aid;
    });

    this.GetMedicalFormula();


  };

  Print(){
    window.print();
  };

  GetMedicalFormula(){
    this.medicalFormulaSvc.GetMedicalFormulasDetail(this.appointment_id)
                .subscribe({
                  error:(err:any) => {
                    console.log(err);
                  },
                  next:(resp:any) => {
                    this.specialty_name = resp[0].medical_specialty.license.specialty.name;
                    this.service_date = resp[0].date;


                    this.internal_notes = resp[0].anamnesis[0].internal_notes;
                    this.reason_for_consultation = resp[0].anamnesis[0].reason_for_consultation;
                    this.recommendations = resp[0].anamnesis[0].recommendations;
                    this.diagnosis = resp[0].anamnesis[0].diagnosis;
                    this.analysis_and_plan = resp[0].anamnesis[0].analysis_and_plan;
                    this.service_type = resp[0].anamnesis[0].observations;
                    this.Medicines = resp[0].vademecum;

                    this.start_date_inhability = resp[0].inability[0].start_date;
                    this.end_date_inhability = resp[0].inability[0].end_date;
                    this.medical_name = `${resp[0].medical_specialty.medical.first_name} ${resp[0].medical_specialty.medical.last_name}` ;
                    this.signatureImage = resp[0].medical_specialty.medical.ally_files.signature_image;
                    console.log(this.signatureImage);
                  }
                })
  };

  // ngx capture function
  // Capture(){
  //   const dimensions = this.screen.nativeElement.getBoundingClientRect();
  //   this.captureService.getImage(this.screen.nativeElement, false,  {
  //     width: dimensions.width,
  //     height: dimensions.height,
  //     useCORS: true,

  //   }).subscribe({
  //     error:(err:any) => {
  //       console.log(err)
  //     },
  //     next:(img:any) => {
  //         const objectURL = URL.createObjectURL(this.convertDataUrlToBlob(img));
  //         // ew File([convertDataUrlToBlob(objectURL)], filename, {type: `image/${extension}`});
  //         this.getSanitazeUrl(objectURL);
  //         console.log(img)
  //     }
  //   })
  // }
  // convertDataUrlToBlob(dataUrl:any): Blob {
  //   const arr = dataUrl.split(',');
  //   const mime = arr[0].match(/:(.*?);/)[1];
  //   const bstr = atob(arr[1]);
  //   let n = bstr.length;
  //   const u8arr = new Uint8Array(n);

  //   while (n--) {
  //       u8arr[n] = bstr.charCodeAt(n);
  //   }

  //   return new Blob([u8arr], {type: mime});
  // };

  // getSanitazeUrl(url : string ) {

  //   this.order = this.sanitizer.bypassSecurityTrustUrl(url);
  //   console.log
  //   this.isCaptured = !this.isCaptured;
  // };




}
