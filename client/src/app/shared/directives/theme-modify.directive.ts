import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Directive({
  selector: '[appThemeModify]',
})
export class ThemeModifyDirective {
  @Input() inputType!: string;

  constructor(private elRef: ElementRef, private store: StoreService) {}
  @HostListener('mouseenter') onMouseEnter() {
    if (this.inputType === 'animation') {
      this.store.$hoverBackgroundColor.subscribe((data: any) => {
        this.elRef.nativeElement.style.backgroundColor = data;
      });
      this.store.$hoverTextColor.subscribe((data: any) => {
        this.elRef.nativeElement.style.color = data;
      });
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.inputType === 'animation') {
      this.elRef.nativeElement.style.backgroundColor = '';
      this.elRef.nativeElement.style.color = '';
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
        this.store.$typoLetterSpacing.subscribe((data: any) => {
          this.elRef.nativeElement.style.letterSpacing = data + 'px';
        });
        break;
      default:
        break;
    }
  }
  ngAfterViewInit(): void {
    this.renderWithObservable();
  }
}
