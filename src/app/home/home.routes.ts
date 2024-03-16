import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../shared/guards/auth.guard';


const routes: Routes = [
    {
        path: '',
        component:HomeComponent,
        canActivate: [AuthGuard],
        children:[
            {
                path:'Welcome',
                loadChildren:() => import('./welcome-panel/welcome-panel.module').then(m => m.WelcomePanelModule)
            },
            {
                path:'Dates',
                loadChildren:() => import('./dates/dates.module').then(m => m.DatesModule)
            },
            {
                path:'MedicalFormula',
                loadChildren:() => import('./medical-formula/medical-formula.module').then(m => m.MedicalFormulaModule)
            },
            {
                path:'MyProfile',
                loadChildren:() => import('../home/my-profile/my-profile.module').then(m => m.MyProfileModule)
            },
            {
                path:'**', redirectTo:'Welcome'
            }
        ]

}

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
export class HomeRoutingModule {}
