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
    bodyBackgroundColor: ['white']
  });

  typographyThemeForm = this.fb.group({
    textColor: ['black'],
    backgroundColor: ['white'],
    bodyBackgroundColor: ['white']
  });

  animationThemeForm = this.fb.group({
    textColor: ['black'],
    backgroundColor: ['white'],
    bodyBackgroundColor: ['white']
  });

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
