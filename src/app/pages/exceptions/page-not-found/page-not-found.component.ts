import { AnimationOptions } from 'ngx-lottie';
import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  options: AnimationOptions = {
    path : '/assets/animations/24454-404.json'
  };

  constructor() { }

  ngOnInit(): void {
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
    animationItem.setSpeed(1.5);
  }

}
