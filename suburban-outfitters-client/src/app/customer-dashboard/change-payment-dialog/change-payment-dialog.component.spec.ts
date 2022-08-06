import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePaymentDialogComponent } from './change-payment-dialog.component';

describe('ChangePaymentDialogComponent', () => {
  let component: ChangePaymentDialogComponent;
  let fixture: ComponentFixture<ChangePaymentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePaymentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
