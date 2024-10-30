import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkGameCreateComponent } from './bulk-game-create.component';

describe('BulkGameCreateComponent', () => {
  let component: BulkGameCreateComponent;
  let fixture: ComponentFixture<BulkGameCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkGameCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkGameCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
