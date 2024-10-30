import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualVerificationComponent } from './manual-verification.component';

describe('ManualVerificationComponent', () => {
  let component: ManualVerificationComponent;
  let fixture: ComponentFixture<ManualVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
