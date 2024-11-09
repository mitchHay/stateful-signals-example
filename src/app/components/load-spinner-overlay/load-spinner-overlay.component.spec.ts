import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadSpinnerOverlayComponent } from './load-spinner-overlay.component';

describe('LoadSpinnerOverlayComponent', () => {
  let component: LoadSpinnerOverlayComponent;
  let fixture: ComponentFixture<LoadSpinnerOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadSpinnerOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadSpinnerOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
