import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ScrollerNavComponent } from './scroller-nav/scroller-nav.component';
import { FooterComponent } from './footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    ScrollerNavComponent,
    FooterComponent
  ], exports:[
    HeaderComponent,
    ScrollerNavComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class SharedModule { }
