import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingPermissionComponent } from './adding-permission.component';

describe('AddingPermissionComponent', () => {
  let component: AddingPermissionComponent;
  let fixture: ComponentFixture<AddingPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddingPermissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddingPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
