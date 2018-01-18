import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendValuesComponent } from './send-values.component';

describe('SendValuesComponent', () => {
  let component: SendValuesComponent;
  let fixture: ComponentFixture<SendValuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
