import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseControlPanelComponent } from './house-control-panel.component';

describe('HouseControlPanelComponent', () => {
  let component: HouseControlPanelComponent;
  let fixture: ComponentFixture<HouseControlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseControlPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
