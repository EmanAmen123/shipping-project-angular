import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernratesComponent } from './governrates.component';

describe('GovernratesComponent', () => {
  let component: GovernratesComponent;
  let fixture: ComponentFixture<GovernratesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GovernratesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovernratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
