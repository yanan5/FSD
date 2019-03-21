import { PinnedDirective } from './pinned.directive';
import { HostBinding, ElementRef } from '@angular/core';
let ele: ElementRef;
describe('PinnedDirective', () => {
  it('should create an instance', () => {
    const directive = new PinnedDirective(ele);
    expect(directive).toBeTruthy();
  });
});
