import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  faHome,
  faShapes,
  faWarehouse,
} from '@fortawesome/free-solid-svg-icons';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css'],
})
export class ThemeComponent implements OnInit {
  constructor(private store: StoreService, private fb: FormBuilder) {}
  faHome = faHome;
  faHouse = faWarehouse;
  faShapes = faShapes;
  imgUrl: string = '../../../assets/imgs/home.png';
  isChecking: Boolean = false;
  currentSection = 'menu';
  //todo: implement more functions.

  menuThemeForm = this.fb.group({
    textColor: ['black'],
    backgroundColor: ['white'],
    bodyBackgroundColor: ['white']
  });

  onSubmit() {
    this.store.setTextColor(this.menuThemeForm.value.textColor);
    this.store.setBackgroundColor(this.menuThemeForm.value.backgroundColor);
  }

  resetField() {
    this.menuThemeForm.reset();
  }

  cardThemeForm = this.fb.group({
    textColor: ['black'],
    backgroundColor: ['white'],
  });

  onCardSubmit() {
    this.store.setCardTextColor(this.cardThemeForm.value.textColor);
    this.store.setCardBackgroundColor(this.cardThemeForm.value.backgroundColor);
  }

  resetCardField() {
    this.cardThemeForm.reset();
  }

  typographyThemeForm = this.fb.group({
    fontSize: [14],
    fontFamily: ['monospace']
  });

  onTypoSubmit() {
    this.store.setTypoFontSize(this.typographyThemeForm.value.fontSize);
    this.store.setTypoFontFamily(this.typographyThemeForm.value.fontFamily);
  }

  resetTypoField() {
    this.typographyThemeForm.reset();
  }


  animationThemeForm = this.fb.group({
    hoverTextColor: ['black'],
    hoverBackgroundColor: ['white'],
  });

  onAnimationSubmit() {
    this.store.setHoverTextColor(this.animationThemeForm.value.hoverTextColor);
    this.store.setHoverBackgroundColor(this.animationThemeForm.value.hoverBackgroundColor);
  }

  resetAnimationField() {
    this.animationThemeForm.reset();
  }

  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }

  scrollTo(section: any) {
    document
      .querySelector('#' + section)
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
  }

  

  ngOnInit(): void {}
}
