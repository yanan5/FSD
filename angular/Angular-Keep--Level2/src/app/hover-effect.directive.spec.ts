import { HoverEffectDirective } from './hover-effect.directive';
import { HostBinding, ElementRef } from '@angular/core';
const ele: ElementRef;
describe('HoverEffectDirective', () => {
  it('should create an instance', () => {
    const directive = new HoverEffectDirective(ele);
    expect(directive).toBeTruthy();
  });
});
