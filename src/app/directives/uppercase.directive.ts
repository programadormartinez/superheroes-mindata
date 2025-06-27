import { Directive,  HostListener } from '@angular/core';

@Directive({
  selector: '[appUppercase]',
  standalone: true,
})
export class UppercaseDirective {
  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    target.value = target.value.toUpperCase();
  }
}
