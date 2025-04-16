import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDeliveryrepresentativesComponent } from './all-deliveryrepresentatives.component';

describe('AllDeliveryrepresentativesComponent', () => {
  let component: AllDeliveryrepresentativesComponent;
  let fixture: ComponentFixture<AllDeliveryrepresentativesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllDeliveryrepresentativesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllDeliveryrepresentativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
