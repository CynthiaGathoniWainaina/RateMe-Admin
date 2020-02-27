import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignFeedbackFormsComponent } from './design-feedback-forms.component';

describe('DesignFeedbackFormsComponent', () => {
  let component: DesignFeedbackFormsComponent;
  let fixture: ComponentFixture<DesignFeedbackFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignFeedbackFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignFeedbackFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
