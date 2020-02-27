import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeebackFormsComponent } from './feeback-forms.component';

describe('FeebackFormsComponent', () => {
  let component: FeebackFormsComponent;
  let fixture: ComponentFixture<FeebackFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeebackFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeebackFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
