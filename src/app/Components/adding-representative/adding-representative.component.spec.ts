import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingRepresentativeComponent } from './adding-representative.component';

describe('AddingRepresentativeComponent', () => {
  let component: AddingRepresentativeComponent;
  let fixture: ComponentFixture<AddingRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddingRepresentativeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddingRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
