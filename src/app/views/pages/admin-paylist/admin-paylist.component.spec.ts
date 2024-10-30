import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaylistComponent } from './admin-paylist.component';

describe('AdminPaylistComponent', () => {
  let component: AdminPaylistComponent;
  let fixture: ComponentFixture<AdminPaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
