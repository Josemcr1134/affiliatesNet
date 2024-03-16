import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { WelcomePanelComponent } from './main-panel/welcome-panel.component';
import { NewsComponent } from './news/news.component';
import { BenefitsComponent } from './benefits/benefits.component';


const routes: Routes = [
    { path: '', children:[
        {path: 'Panel', component:WelcomePanelComponent},
        {path:'News', component:NewsComponent},
        {path:'Benefits', component:BenefitsComponent},
        {path: '**', redirectTo:'Panel'}
    ]}

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WelcomeRoutingModule {}
