import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomImageViewerComponent } from './zoom-image-viewer.component';

describe('ZoomImageViewerComponent', () => {
  let component: ZoomImageViewerComponent;
  let fixture: ComponentFixture<ZoomImageViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZoomImageViewerComponent]
    });
    fixture = TestBed.createComponent(ZoomImageViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
