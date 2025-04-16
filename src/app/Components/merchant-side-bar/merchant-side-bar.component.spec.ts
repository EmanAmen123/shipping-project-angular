import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantSideBarComponent } from './merchant-side-bar.component';

describe('MerchantSideBarComponent', () => {
  let component: MerchantSideBarComponent;
  let fixture: ComponentFixture<MerchantSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchantSideBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
