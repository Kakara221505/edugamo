import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistCreatedViewComponent } from './playlist-created-view.component';

describe('PlaylistCreatedViewComponent', () => {
  let component: PlaylistCreatedViewComponent;
  let fixture: ComponentFixture<PlaylistCreatedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistCreatedViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistCreatedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
