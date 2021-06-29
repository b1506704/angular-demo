import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseCarouselComponent } from './house-carousel.component';

describe('HouseCarouselComponent', () => {
  let component: HouseCarouselComponent;
  let fixture: ComponentFixture<HouseCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
