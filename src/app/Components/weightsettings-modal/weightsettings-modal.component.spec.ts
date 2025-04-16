import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightsettingsModalComponent } from './weightsettings-modal.component';

describe('WeightsettingsModalComponent', () => {
  let component: WeightsettingsModalComponent;
  let fixture: ComponentFixture<WeightsettingsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeightsettingsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeightsettingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
