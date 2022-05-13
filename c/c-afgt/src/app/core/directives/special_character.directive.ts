
import { Directive, HostListener, ElementRef, Input } from '@angular/core';
@Directive({
  selector: '[SpecialCharacterDirective]'
})
export class SpecialCharacterDirective {


  constructor(private el: ElementRef) { }

 @HostListener('keypress', ['$event']) onKeyPress(event) {
   setTimeout(()=>{
    this.el.nativeElement.value = this.el.nativeElement.value.replace(/[<>]/g, "")
   },100)
 
}

 

}



