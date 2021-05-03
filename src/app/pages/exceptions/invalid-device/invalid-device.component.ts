import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-invalid-device',
  templateUrl: './invalid-device.component.html',
  styleUrls: ['./invalid-device.component.scss']
})
export class InvalidDeviceComponent implements OnInit {

  options: AnimationOptions = {
    path: '/assets/animations/37452-mobile-phone-blue.json',
  };

  constructor() { }

  ngOnInit(): void {
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
    // setTimeout(() => {
    //   animationItem.goToAndStop(animationItem.firstFrame + animationItem.totalFrames-1, true);
    // }, 3000);
  }

}
