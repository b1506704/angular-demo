import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { House } from 'src/app/models/house.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-house-card',
  templateUrl: './house-card.component.html',
  styleUrls: ['./house-card.component.css'],
})
export class HouseCardComponent implements OnInit {
  // data from parent component
  @Input() house: Array<House> = [];
  constructor(
    private store: StoreService,
    private md: NgbModal,
    private router: Router
  ) {}
  $mdObs: Observable<TemplateRef<any>> = this.store.$modalRef;
  // set selectedHouse in store
  selectHouse(house: House) {
    this.router.navigate(['house', house.id]);
  }

  deleteHouse(house: House) {
    this.store.deleteHouse(house);
  }

  triggerModal(content: any) {
    this.md.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
    });
  }
  updateHouse(house: House) {
    this.store.selectHouse(house);
    this.$mdObs
      .subscribe((data: any) => {
        this.triggerModal(data);
      })
      .unsubscribe();
  }

  ngOnInit(): void {}
}
