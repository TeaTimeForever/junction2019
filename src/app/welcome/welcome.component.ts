import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  template: `
<div class="anxiety">
  <h3>What is Anxiety?</h3>
  <div class="illustration">
    <img *ngFor="let img of disorderImgs"
      [src]="'./assets/disorder/'+img +'.svg'" [alt]="img">
  </div>
  <p>Anxiety is your body's natural response to stress. It's a feeling of fear or apprehension about what's to come. The first day of school, going to a job interview, or giving a speech may cause most people to feel fearful and nervous. </p>
</div>

<div class="trainings">
  <h3>Train to become more robust</h3>
  <div class="illustration">
    <img *ngFor="let img of relaxImgs"
         [src]="'./assets/relax/'+img +'.svg'" [alt]="img">
  </div>
  <mat-selection-list #shoes>
    <mat-list-option *ngFor="let shoe of typesOfShoes">
      {{shoe}}
    </mat-list-option>
  </mat-selection-list>
</div>
<img class="calm" src="./assets/calm.jpg">
  `,
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  disorderImgs = ['Apathy', 'Antisocial Personality Disorder', 'Shaking'];
  relaxImgs = ['Art Therapy', 'Breathe Deeply', 'Take a Walk', 'Have a Warm Drink', 'Laugh Out Loud'];
  constructor() { }

  ngOnInit() {
  }

}
