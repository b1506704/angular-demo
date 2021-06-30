import { ThrowStmt } from '@angular/compiler';
import {
  Component,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  faEdit,
  faPlus,
  faSearch,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { House } from 'src/app/models/house.model';
import { StoreService } from 'src/app/services/store.service';
import { nonAccentVietnamese } from 'src/app/utils/convertToNonAccent';
import { SortEvent, SortHeader } from './sort-header.directive';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  faSearch = faSearch;

  @ViewChildren(SortHeader) headers!: QueryList<SortHeader>;
  constructor(
    private md: NgbModal,
    private fb: FormBuilder,
    private store: StoreService
  ) {}
  criteria: string = '';
  houseList!: Array<House>;

  $mdObs: Observable<TemplateRef<any>> = this.store.$modalRef;
  categoryList$: Observable<Array<Category>> = this.store.$categoryList;

  page: number = 1;
  pageSize: number = 7;
  isFiltering: Boolean = false;
  isSearching: Boolean = false;
  isCollapsed: boolean = true;

  compare = (v1: string | number | boolean, v2: string | number | boolean) =>
    v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    // sort item
    if (direction === '' || column === '') {
      this.getHouseListener();
    } else {
      this.houseList = [...this.houseList].sort((a, b) => {
        const res = this.compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  // selectHouse(house: House) {
  //   this.router.navigate(['house', house.id]);
  // }

  filterForm = this.fb.group({
    category: [''],
    gtArea: [0],
    gtFront: [0],
  });

  searchForm = this.fb.group({
    searchMessage: [''],
  });

  resetField() {
    this.filterForm.reset();
  }

  filterHouse() {
    this.store.$houseList
      .subscribe((data: any) => {
        this.store.filterHouse(
          data.filter((h: any) => {
            this.criteria = '';
            const criteria =
              h.category === this.filterForm.value.category &&
              h.area > Number(this.filterForm.value.gtArea) &&
              h.front > Number(this.filterForm.value.gtFront);
            this.criteria += `${this.filterForm.value.category} 
            | Area> ${this.filterForm.value.gtArea}  
            | Front> ${this.filterForm.value.gtFront}
            `;
            return criteria;
          }),
          this.criteria
        );
        this.store.setIsFiltering(true);
      })
      .unsubscribe();
  }

  searchHouse() {
    const searchObs$ = this.searchForm.valueChanges.subscribe((input: any) => {
      this.store.$houseList
        .subscribe((data: any) => {
          this.store.searchHouse(
            data.filter((h: any) => {
              const houseMessage = nonAccentVietnamese(h.message);
              const inputMessage = nonAccentVietnamese(input.searchMessage);
              return houseMessage.includes(inputMessage);
            }),
            input.searchMessage
          );
          this.store.setIsSearching(true);
        })
        .unsubscribe();
    });
    return searchObs$;
  }

  onSubmit() {
    this.filterHouse();
  }

  onReset() {
    this.store.setIsFiltering(false);
    this.store.setIsSearching(false);
    this.criteria = '';
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

  // filterListener() {
  //   const filterObs$ = this.store.$isFiltering.subscribe((data: any) => {
  //     this.isFiltering = data;
  //     if (this.isFiltering === true) {
  //       this.houseList$ = this.store.$filteredHouseList;
  //     } else {
  //       this.houseList$ = this.store.$houseList;
  //     }
  //   });
  //   return filterObs$;
  // }

  searchListener() {
    const searchObs$ = this.store.$isSearching.subscribe((data: any) => {
      this.isSearching = data;
      if (this.isSearching === true) {
        this.store.$searchedHouseList.subscribe((data: any) => {
          this.houseList = data;
        });
      } else {
        this.getHouseListener();
      }
    });
    return searchObs$;
  }

  getHouseListener() {
    const houseListObs$ = this.store.$houseList.subscribe((data: any) => {
      this.houseList = data;
    });
    return houseListObs$;
  }


  ngOnInit(): void {
    this.getHouseListener();
    this.searchHouse();
    this.searchListener();
  }

  ngOnDestroy(): void {
    if (this.isFiltering === true || this.isSearching === true) {
      this.store.setIsFiltering(false);
      this.store.setIsSearching(false);
    }
    this.getHouseListener().unsubscribe();
    this.searchHouse().unsubscribe();
    this.searchListener().unsubscribe();
  }
}
