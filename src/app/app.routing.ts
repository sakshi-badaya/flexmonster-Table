import { AppComponent } from './app.component';

import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FlexMonsterComponent } from './flex-monster/flex-monster.component';


export const RouteDefinitions: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'flexMonster', component: FlexMonsterComponent},
   
    {path: '**', component: HomeComponent}
];
