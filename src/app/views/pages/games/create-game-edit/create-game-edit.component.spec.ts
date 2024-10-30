import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGameEditComponent } from './create-game-edit.component';

describe('CreateGameEditComponent', () => {
  let component: CreateGameEditComponent;
  let fixture: ComponentFixture<CreateGameEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGameEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGameEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
