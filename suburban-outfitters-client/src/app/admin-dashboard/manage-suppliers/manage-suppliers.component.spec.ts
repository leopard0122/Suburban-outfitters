import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSuppliersComponent } from './manage-suppliers.component';

describe('ManageSuppliersComponent', () => {
  let component: ManageSuppliersComponent;
  let fixture: ComponentFixture<ManageSuppliersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSuppliersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
