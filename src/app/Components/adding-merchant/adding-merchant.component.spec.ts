import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingMerchantComponent } from './adding-merchant.component';

describe('AddingMerchantComponent', () => {
  let component: AddingMerchantComponent;
  let fixture: ComponentFixture<AddingMerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddingMerchantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddingMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
