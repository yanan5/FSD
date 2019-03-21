import { Directive, OnInit, Input } from '@angular/core';
import { HostBinding, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverEffect]'
})
export class HoverEffectDirective {
  @Input() appHoverEffect: boolean;
  @HostBinding('style.background-color') bg: string;

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onmouseenter() {
    this.bg = 'yellow';
  }

  @HostListener('mouseleave') onmouseleave() {
    this.bg = null;
  }
}
