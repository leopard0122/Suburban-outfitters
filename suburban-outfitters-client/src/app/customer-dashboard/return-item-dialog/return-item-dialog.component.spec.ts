import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnItemDialogComponent } from './return-item-dialog.component';

describe('ReturnItemDialogComponent', () => {
  let component: ReturnItemDialogComponent;
  let fixture: ComponentFixture<ReturnItemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnItemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
