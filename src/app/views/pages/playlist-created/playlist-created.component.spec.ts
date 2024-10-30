import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistCreatedComponent } from './playlist-created.component';

describe('PlaylistCreatedComponent', () => {
  let component: PlaylistCreatedComponent;
  let fixture: ComponentFixture<PlaylistCreatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistCreatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
