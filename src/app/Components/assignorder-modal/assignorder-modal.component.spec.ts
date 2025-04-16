import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignorderModalComponent } from './assignorder-modal.component';

describe('AssignorderModalComponent', () => {
  let component: AssignorderModalComponent;
  let fixture: ComponentFixture<AssignorderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignorderModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignorderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
