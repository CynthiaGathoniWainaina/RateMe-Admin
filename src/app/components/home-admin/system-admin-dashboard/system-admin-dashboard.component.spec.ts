import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAdminDashboardComponent } from './system-admin-dashboard.component';

describe('SystemAdminDashboardComponent', () => {
  let component: SystemAdminDashboardComponent;
  let fixture: ComponentFixture<SystemAdminDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAdminDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
