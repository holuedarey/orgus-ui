import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="caption">
      Created by <b><a href="#" target="_blank">Spout Payments</a></b>  {{ currentYear }}
    </span>
  `,
  
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
}
