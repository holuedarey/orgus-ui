import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratingSetPerformanceComponent } from './generating-set-performance.component';

describe('GeneratingSetPerformanceComponent', () => {
  let component: GeneratingSetPerformanceComponent;
  let fixture: ComponentFixture<GeneratingSetPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratingSetPerformanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratingSetPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
