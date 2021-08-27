import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPointPerformanceComponent } from './load-point-performance.component';

describe('LoadPointPerformanceComponent', () => {
  let component: LoadPointPerformanceComponent;
  let fixture: ComponentFixture<LoadPointPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadPointPerformanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadPointPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
