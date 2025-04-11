import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOrdersNavComponent } from './show-orders-nav.component';

describe('ShowOrdersNavComponent', () => {
  let component: ShowOrdersNavComponent;
  let fixture: ComponentFixture<ShowOrdersNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowOrdersNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowOrdersNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
