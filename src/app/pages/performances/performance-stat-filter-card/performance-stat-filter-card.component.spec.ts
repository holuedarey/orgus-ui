import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceStatFilterCardComponent } from './performance-stat-filter-card.component';

describe('PerformanceStatFilterCardComponent', () => {
  let component: PerformanceStatFilterCardComponent;
  let fixture: ComponentFixture<PerformanceStatFilterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceStatFilterCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceStatFilterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
