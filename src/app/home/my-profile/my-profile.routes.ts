import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MyProfileComponent } from './my-profile.component';



const routes: Routes = [
    { path: '',  children: [ 
        {path:'Profile', component:MyProfileComponent},
        {path:'**', redirectTo:'Profile'}
    ] },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyProfileRoutingModule {}
