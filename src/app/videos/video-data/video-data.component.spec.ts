import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDataComponent } from './video-data.component';

describe('VideoDataComponent', () => {
  let component: VideoDataComponent;
  let fixture: ComponentFixture<VideoDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
