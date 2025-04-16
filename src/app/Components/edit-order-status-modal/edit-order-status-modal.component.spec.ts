import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrderStatusModalComponent } from './edit-order-status-modal.component';

describe('EditOrderStatusModalComponent', () => {
  let component: EditOrderStatusModalComponent;
  let fixture: ComponentFixture<EditOrderStatusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditOrderStatusModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOrderStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
