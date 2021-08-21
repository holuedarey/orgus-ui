import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPointManagementsComponent } from './load-point-managements.component';

describe('LoadPointManagementsComponent', () => {
  let component: LoadPointManagementsComponent;
  let fixture: ComponentFixture<LoadPointManagementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadPointManagementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadPointManagementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
