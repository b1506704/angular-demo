import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/models/category.model';
import { House } from 'src/app/models/house.model';
import { StoreService } from 'src/app/services/store.service';

import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal-update',
  templateUrl: './modal-update.component.html',
  styleUrls: ['./modal-update.component.css'],
})
export class ModalUpdateComponent implements OnInit {
  faWindowClose = faWindowClose;
  @ViewChild('modalData', { static: true })
  modalData!: TemplateRef<any>;
  currentHouse!: House;
  category: Array<Category> = [];
  imgUrl: string = '';
  isChecking: Boolean = false;
  houseForm!: any;

  constructor(
    private md: NgbModal,
    private store: StoreService,
    private fb: FormBuilder
  ) {}

  triggerModal(content: any) {
    this.md.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
    });
  }
  
  onSubmit() {
    // console.log(JSON.stringify(this.houseForm.value));
    if (this.isChecking === false) {
      this.store.updateHouse(this.houseForm.value);
      this.md.dismissAll();
    }
  }

  resetField() {
    this.houseForm.reset();
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
    this.houseForm.patchValue({ imgUrl: reader.result });
  }


  ngAfterViewInit() {
    this.store.triggerModal(this.modalData);
  }

  ngOnInit(): void {
    this.store.$categoryList.subscribe((data: any) => {
      this.category = data;
    });

    this.store.$selectedHouse.subscribe((data: any) => {
      this.currentHouse = data;
      this.houseForm = this.fb.group({
        id: this.currentHouse?.id,
        message: [
          this.currentHouse?.message,
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(25),
          ],
        ],
        price: [
          this.currentHouse?.price,
          [Validators.required, Validators.min(1)],
        ],
        category: [this.currentHouse?.category, Validators.required],
        imgUrl: [this.currentHouse?.imgUrl || this.imgUrl, Validators.required],
        area: [
          this.currentHouse?.area,
          [Validators.required, Validators.min(1)],
        ],
        front: [
          this.currentHouse?.front,
          [Validators.required, Validators.min(1)],
        ],
        direction: [
          this.currentHouse?.direction,
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(25),
          ],
        ],
        address: [
          this.currentHouse?.address,
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(50),
          ],
        ],
      });
      this.houseForm.statusChanges.subscribe((data: any) => {
        if (data === 'INVALID') {
          this.isChecking = true;
        } else if (data === 'VALID') {
          this.isChecking = false;
        }
      });
      // console.log(this.houseForm.value);
    });
  }
}
