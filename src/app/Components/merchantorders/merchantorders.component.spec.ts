import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantordersComponent } from './merchantorders.component';

describe('MerchantordersComponent', () => {
  let component: MerchantordersComponent;
  let fixture: ComponentFixture<MerchantordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchantordersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
