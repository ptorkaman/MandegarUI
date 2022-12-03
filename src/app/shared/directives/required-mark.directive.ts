import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[requiredMark]'
})
export class RequiredMarkDirective implements AfterViewInit {


  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngAfterViewInit(): void {
    const span = this.renderer.createElement('span');
    this.renderer.setAttribute(span, 'class', 'error-block');
    const text = this.renderer.createText('*');

    this.renderer.appendChild(span, text);
    this.renderer.appendChild(this.el.nativeElement, span);
  }

}
