import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-user-idle',
  templateUrl: './user-idle.component.html',
  styleUrls: ['./user-idle.component.scss']
})
export class UserIdleComponent implements OnInit {

  options: AnimationOptions = {
    path: '/assets/animations/38063-log-out.json',
  };

  constructor() { }

  ngOnInit(): void {
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
    animationItem.setSpeed(0.5);
    // setTimeout(() => {
    // animationItem.goToAndStop(animationItem.firstFrame + animationItem.totalFrames-1, true);
    // }, 3000);
  }

}
