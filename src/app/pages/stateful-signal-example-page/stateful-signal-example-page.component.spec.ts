import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatefulSignalExampleComponent } from './stateful-signal-example-page.component';

describe('StatefulSignalExampleComponent', () => {
  let component: StatefulSignalExampleComponent;
  let fixture: ComponentFixture<StatefulSignalExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatefulSignalExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatefulSignalExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
