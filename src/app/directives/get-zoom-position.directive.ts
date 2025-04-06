import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appGetZoomPosition]'
})
export class GetZoomPositionDirective {

  @Output('appGetZoomPosition') eOnZoom = new EventEmitter();
  imgNativeEl: any;
  constructor(private imgEl: ElementRef) {
    this.imgNativeEl = imgEl.nativeElement;
  }

  private getCursorPosition(event: any) {
    const rect = this.imgNativeEl.getBoundingClientRect();
    const x = event.pageX - rect.left;
    const y = event.pageY - rect.top;

    return {x, y, width: rect.width, height: rect.height};
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: any) {
    this.eOnZoom.emit(null);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: any) {
    const pos = this.getCursorPosition(event);
    this.eOnZoom.emit({ x: (pos.x / pos.width) * 100, y: (pos.y / pos.height) * 100});
  }

}
