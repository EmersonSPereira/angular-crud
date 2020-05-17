import { Directive, ElementRef } from '@angular/core';
import { mixinColor } from '@angular/material/core';

@Directive({
  selector: '[appRed]'
})
export class RedDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.style.color = '#ff0000';
   }

}
