import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesCreatedComponent } from './games-created.component';

describe('GamesCreatedComponent', () => {
  let component: GamesCreatedComponent;
  let fixture: ComponentFixture<GamesCreatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesCreatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
