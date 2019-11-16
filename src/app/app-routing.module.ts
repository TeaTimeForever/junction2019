import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { NoComponent } from './no/no.component';
import { MyChallengesComponent } from './my-challenges/my-challenges.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'no', component: NoComponent},
  { path: 'myChallenges', component: MyChallengesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
