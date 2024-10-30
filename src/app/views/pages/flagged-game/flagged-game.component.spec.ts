import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlaggedGameComponent } from './flagged-game.component';

describe('FlaggedGameComponent', () => {
  let component: FlaggedGameComponent;
  let fixture: ComponentFixture<FlaggedGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlaggedGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlaggedGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
