import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appThemeModify]',
})
export class ThemeModifyDirective {
  @Input() textColor!: string;
  @Input() backgroundColor!: string;
  constructor(private elRef: ElementRef) {}
  ngAfterViewInit(): void {
    this.textColor = this.textColor || 'black';
    this.backgroundColor = this.backgroundColor || 'rgba(83, 110, 182, 0.39)';
    this.elRef.nativeElement.style.color = this.textColor;
    this.elRef.nativeElement.style.backgroundColor = this.backgroundColor;
  }
}
