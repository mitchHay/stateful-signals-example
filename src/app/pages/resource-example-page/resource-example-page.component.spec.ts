import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceExamplePageComponent } from './resource-example-page.component';

describe('ResourceExamplePageComponent', () => {
  let component: ResourceExamplePageComponent;
  let fixture: ComponentFixture<ResourceExamplePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceExamplePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceExamplePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
