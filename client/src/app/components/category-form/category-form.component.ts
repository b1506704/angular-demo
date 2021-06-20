import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  imgUrl: string = '';
  isChecking: Boolean = false;

  constructor(private store: StoreService, private fb: FormBuilder) {}

  onSubmit() {
    console.log(JSON.stringify(this.categoryForm.value));
  }

  resetField() {
    this.categoryForm.reset();
    this.imgUrl = '';
  }

  handleInputChange(e: any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      console.log('invalid format');
      return;
    }

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e: any) {
    var reader = e.target;
    this.imgUrl = reader.result;
    this.categoryForm.patchValue({ imageUrl: reader.result });
  }

  categoryForm = this.fb.group({
    name: ['', [Validators.required,Validators.minLength(1), Validators.maxLength(25)]],
    imageUrl: ['', Validators.required],
  });

  ngOnInit(): void {
    this.categoryForm.statusChanges.subscribe((data: any) => {
      if (data === 'INVALID') {
        this.isChecking = true;
      } else if (data === 'VALID') {
        this.isChecking = false;
      }
    });
  }

}
