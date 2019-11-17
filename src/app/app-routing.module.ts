import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { NoComponent } from './no/no.component';
import { MyChallengesComponent } from './my-challenges/my-challenges.component';
import { AdminComponent } from './admin/admin.component';
import { MapComponent } from './map/map.component';
import { TrainingConfigurationComponent } from './training-configuration/training-configuration.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'no', component: NoComponent},
  { path: 'myChallenges', component: MyChallengesComponent},
  { path: 'administrator', component: AdminComponent},
  { path: 'map', component: MapComponent},
  { path: 'training-config', component: TrainingConfigurationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
