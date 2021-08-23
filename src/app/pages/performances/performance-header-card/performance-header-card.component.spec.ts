import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceHeaderCardComponent } from './performance-header-card.component';

describe('PerformanceHeaderCardComponent', () => {
  let component: PerformanceHeaderCardComponent;
  let fixture: ComponentFixture<PerformanceHeaderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceHeaderCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceHeaderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
