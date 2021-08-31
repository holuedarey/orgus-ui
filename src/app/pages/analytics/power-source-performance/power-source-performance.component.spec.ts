import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerSourcePerformanceComponent } from './power-source-performance.component';

describe('PowerSourcePerformanceComponent', () => {
  let component: PowerSourcePerformanceComponent;
  let fixture: ComponentFixture<PowerSourcePerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerSourcePerformanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerSourcePerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
