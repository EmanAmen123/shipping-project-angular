import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGovrnModalComponent } from './edit-govrn-modal.component';

describe('EditGovrnModalComponent', () => {
  let component: EditGovrnModalComponent;
  let fixture: ComponentFixture<EditGovrnModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditGovrnModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGovrnModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
