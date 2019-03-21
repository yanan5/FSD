import { Directive, AfterViewInit, Input } from '@angular/core';
import { HostBinding, ElementRef } from '@angular/core';
@Directive({
  selector: '[appPinned]'
})
export class PinnedDirective implements AfterViewInit {
  @Input() appPinned: boolean;
  @HostBinding('style.background-color') bg: string;

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    if (this.appPinned) {
      setTimeout(() => this.bg = 'yellow', 0);
    } else {
      setTimeout(() => this.bg = null, 0);
    }
  }

}
