import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerSourcePerformanceChartComponent } from './power-source-performance-chart.component';

describe('PowerSourcePerformanceChartComponent', () => {
  let component: PowerSourcePerformanceChartComponent;
  let fixture: ComponentFixture<PowerSourcePerformanceChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerSourcePerformanceChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerSourcePerformanceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
