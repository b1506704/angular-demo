import { Directive, ElementRef, Input } from '@angular/core';
import { StoreService } from '../services/store.service';

@Directive({
  selector: '[appThemeModify]',
})
export class ThemeModifyDirective {
  @Input() txtColor!: string;
  @Input() bgColor!: string;
  constructor(private elRef: ElementRef, private store: StoreService) {}

  renderWithInput() {
    //render if input is provided
    if (this.txtColor) {
      this.elRef.nativeElement.style.textColor = this.txtColor;
    }
    if (this.bgColor) {
      this.elRef.nativeElement.style.bgColor = this.bgColor;
    }
  }

  renderWithObservable() {
    this.store.$backgroundColor.subscribe((data: any) => {
      this.elRef.nativeElement.style.backgroundColor = data;
    });
    this.store.$textColor.subscribe((data: any) => {
      this.elRef.nativeElement.style.color = data;
    });
  }
  ngAfterViewInit(): void {
    this.renderWithInput();
    this.renderWithObservable();
  }
}
