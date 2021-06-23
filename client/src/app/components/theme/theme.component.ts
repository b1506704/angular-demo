import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css'],
})
export class ThemeComponent implements OnInit {
  constructor(private store: StoreService, private fb: FormBuilder) {}
  themeForm = this.fb.group({
    textColor: ['black'],
    backgroundColor: ['white'],
  });
  onSubmit() {
    this.store.setTextColor(this.themeForm.value.textColor);
    this.store.setBackgroundColor(this.themeForm.value.backgroundColor);
  }
  resetField() {
    this.themeForm.reset();
  }
  ngOnInit(): void {}
}
