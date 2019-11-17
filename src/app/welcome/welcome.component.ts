import { Component, OnInit } from '@angular/core';
import { trainingMock } from '../model/trainings';


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
  <!--p>Day-to-day problems affect important aspects of your life, like relationships and work, can have a big impact on your mental health. When they don’t go away, or get bigger, the emotions they cause can overwhelm you.</p-->
  <p>What you can do about anxiety? Here we we present you with a number of trainings that can help you strengthen your ability to deal with anxiety.</p>
  <mat-list #trainings>
    <mat-list-item *ngFor="let training of trainigns">
      <a routerLink="no">{{training.name}}</a>

    </mat-list-item>
  </mat-list>
</div>
<img class="calm" src="./assets/calm.jpg">
  `,
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  disorderImgs = ['Apathy', 'Antisocial Personality Disorder', 'Shaking'];
  relaxImgs = ['Art Therapy', 'Breathe Deeply', 'Take a Walk', 'Have a Warm Drink', 'Laugh Out Loud'];
  trainigns = trainingMock;
  constructor() {
    console.log(this.trainigns);
  }

  ngOnInit() {
  }

}
