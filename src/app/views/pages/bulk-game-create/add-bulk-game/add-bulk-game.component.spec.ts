import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBulkGameComponent } from './add-bulk-game.component';

describe('AddBulkGameComponent', () => {
  let component: AddBulkGameComponent;
  let fixture: ComponentFixture<AddBulkGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBulkGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBulkGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
