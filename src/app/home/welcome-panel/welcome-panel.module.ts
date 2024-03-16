import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule } from './welcome.routes';
import { WelcomePanelComponent } from './main-panel/welcome-panel.component';
import { NewsComponent } from './news/news.component';
import { OrderingsComponent } from './orderings/orderings.component';
import { BenefitsComponent } from './benefits/benefits.component';



@NgModule({
  declarations: [
    WelcomePanelComponent,
    NewsComponent,
    OrderingsComponent,
    BenefitsComponent
  ],
  imports: [
    CommonModule, 
    WelcomeRoutingModule
  ]
})
export class WelcomePanelModule { }
