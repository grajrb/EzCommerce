import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-zoom-image-viewer',
  templateUrl: './zoom-image-viewer.component.html',
  styleUrls: ['./zoom-image-viewer.component.css']
})
export class ZoomImageViewerComponent {

  @ViewChild('zoomImage', {static: true}) zoomImage!: ElementRef;

  @Input('coordinates') set setCoordinates(coordinate: any) {
    if(!coordinate) return;
    const {x, y} = coordinate;
    this.renderer.setStyle(this.zoomImage.nativeElement, 'backgroundPosition', `${x}% ${y}%`);
  }

  @Input('image') set setImageUrl(url: any) {
    this.renderer.setStyle(this.zoomImage.nativeElement, 'backgroundImage', `url(${url})`);
  }

  constructor (private renderer: Renderer2) {

  }

}
