import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { StoreService } from '../services/store.service';

@Directive({
  selector: '[appThemeModify]',
})
export class ThemeModifyDirective {
  @Input() txtColor!: string;
  @Input() bgColor!: string;
  @Input() inputType!: string;
  hoverClass = '';

  constructor(private elRef: ElementRef, private store: StoreService) {}
  // @HostListener('mouseenter') onMouseEnter() {
  //   this.elRef.nativeElement.classList.add(this.hoverClass);
  // }

  // @HostListener('mouseleave') onMouseLeave() {
  //   this.elRef.nativeElement.classList.remove(this.hoverClass);
  // }

  renderWithInput() {
    //render if input is provided
    if (this.txtColor) {
      this.elRef.nativeElement.style.color = this.txtColor;
    }
    if (this.bgColor) {
      this.elRef.nativeElement.style.backgroundColor = this.bgColor;
    }
  }

  renderWithObservable() {
    switch (this.inputType) {
      case 'menu':
        this.store.$backgroundColor.subscribe((data: any) => {
          this.elRef.nativeElement.style.backgroundColor = data;
        });
        this.store.$textColor.subscribe((data: any) => {
          this.elRef.nativeElement.style.color = data;
        });
        break;
      case 'card':
        this.store.$cardBackgroundColor.subscribe((data: any) => {
          this.elRef.nativeElement.style.backgroundColor = data;
        });
        this.store.$cardTextColor.subscribe((data: any) => {
          this.elRef.nativeElement.style.color = data;
        });
        break;
      case 'typo':
        this.store.$typoFontFamily.subscribe((data: any) => {
          this.elRef.nativeElement.style.fontFamily = data;
        });
        this.store.$typoFontSize.subscribe((data: any) => {
          this.elRef.nativeElement.style.fontSize = data + 'px';
        });
        break;
      case 'animation':
        this.store.$hoverBackgroundColor.subscribe((data: any) => {
          this.hoverClass += `background-color: ${data};`;
        });
        this.store.$hoverTextColor.subscribe((data: any) => {
          this.hoverClass += `color: ${data};`;
        });
        break;
      default:
        break;
    }
  }
  ngAfterViewInit(): void {
    this.renderWithInput();
    this.renderWithObservable();
  }
}
