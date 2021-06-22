import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-house-form',
  templateUrl: './house-form.component.html',
  styleUrls: ['./house-form.component.css'],
})
export class HouseFormComponent implements OnInit {
  @Input() category: Array<Category> = [];
  imgUrl: string = '';
  isChecking: Boolean = false;
  constructor(private store: StoreService, private fb: FormBuilder) {}
  randomID(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
  onSubmit() {
    // console.log(JSON.stringify(this.houseForm.value));
    this.store.uploadHouse(this.houseForm.value);
    this.resetField();
  }

  resetField() {
    this.houseForm.reset();
    this.imgUrl = '';
    this.houseForm.patchValue({id: this.randomID()});
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
    this.houseForm.patchValue({ imgUrl: reader.result });
  }

  houseForm = this.fb.group({
    id: [this.randomID()],
    message: ['', [Validators.required,Validators.minLength(1), Validators.maxLength(25)]],
    price: [0, [Validators.required,Validators.min(1)]],
    category: ['', Validators.required],
    imgUrl: ['', Validators.required],
    area: [0, [Validators.required,Validators.min(1)]],
    front: [0, [Validators.required,Validators.min(1)]],
    direction: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(25)]],
    address: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(50)]],
  });

  ngOnInit(): void {
    this.houseForm.statusChanges.subscribe((data: any) => {
      if (data === 'INVALID') {
        this.isChecking = true;
      } else if (data === 'VALID') {
        this.isChecking = false;
      }
    });
  }
}
