import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverySideBarComponent } from './delivery-side-bar.component';

describe('DeliverySideBarComponent', () => {
  let component: DeliverySideBarComponent;
  let fixture: ComponentFixture<DeliverySideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliverySideBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliverySideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
