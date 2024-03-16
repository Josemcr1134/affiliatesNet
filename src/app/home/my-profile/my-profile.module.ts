import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from './my-profile.component';
import { MyProfileRoutingModule } from './my-profile.routes';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MyProfileComponent,
  ],
  imports: [
    CommonModule,
    MyProfileRoutingModule,
    FormsModule
  ]
})
export class MyProfileModule { }
