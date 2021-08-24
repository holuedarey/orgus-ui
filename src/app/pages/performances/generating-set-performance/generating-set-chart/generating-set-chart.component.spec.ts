import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratingSetChartComponent } from './generating-set-chart.component';

describe('GeneratingSetChartComponent', () => {
  let component: GeneratingSetChartComponent;
  let fixture: ComponentFixture<GeneratingSetChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratingSetChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratingSetChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
