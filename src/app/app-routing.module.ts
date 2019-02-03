
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { HomeComponent } from './components/home/home.component';

const ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'toolbox',
        component: ToolboxComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
