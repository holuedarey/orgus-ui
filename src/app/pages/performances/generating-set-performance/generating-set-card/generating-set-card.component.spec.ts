import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratingSetCardComponent } from './generating-set-card.component';

describe('GeneratingSetCardComponent', () => {
  let component: GeneratingSetCardComponent;
  let fixture: ComponentFixture<GeneratingSetCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratingSetCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratingSetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
