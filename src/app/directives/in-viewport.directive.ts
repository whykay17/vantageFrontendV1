import { Directive, ElementRef, EventEmitter, Output, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appInViewport]'
})
export class InViewportDirective implements AfterViewInit, OnDestroy {
  @Output() inViewport = new EventEmitter<boolean>();
  private observer?: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.observer = new IntersectionObserver(([entry]) => {
      this.inViewport.emit(entry.isIntersecting);
    }, { threshold: 0.2 });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
