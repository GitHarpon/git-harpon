
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToolboxComponent } from './screens/toolbox/toolbox.component';
import { HomeComponent } from './screens/home/home.component';
import { PreferencesComponent } from './screens/preferences/preferences.component';

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
    },
    {
        path: 'preferences',
        component: PreferencesComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
