import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Granim from 'granim';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { SeoService } from 'src/app/@core/utils/seo.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {

  options: AnimationOptions = {
    path: '/assets/animations/lf30_editor_ibdb37al.json',
  };
  granimInstance: any;

  constructor(private seo: SeoService) { }

  ngOnInit(): void {
    this.granimInstance = new Granim({
      element: '#landing-canvas',
      direction: 'left-right',
      isPausedWhenNotInView: true,
      states: {
        'default-state': {
          gradients: [
            ['#e4e9f2', '#8f9bb3'],
            ['#e4e9f2', '#8f9bb3'],
            ['#e4e9f2', '#8f9bb3'],
            ['#ffc94d', '#db8b00'],
            ['#2ce69b', '#00b887'],
            ['#ff708d', '#db2c66'],
          ]
        }
      },
      transitionSpeed: 2000
    });
    this.seo.setSeoData('Home', 'Landing Page');
  }

  animationCreated(animationItem: AnimationItem): void {
    animationItem.setSpeed(0.3);
    // setTimeout(() => {
    //   animationItem.goToAndStop(animationItem.firstFrame + animationItem.totalFrames-1, true);
    // }, 3000);
  }

  ngOnDestroy(): void {
    this.granimInstance.destroy();
  }

}
