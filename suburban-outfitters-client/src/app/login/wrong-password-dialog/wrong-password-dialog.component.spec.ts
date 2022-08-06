import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongPasswordDialogComponent } from './wrong-password-dialog.component';

describe('WrongPasswordDialogComponent', () => {
  let component: WrongPasswordDialogComponent;
  let fixture: ComponentFixture<WrongPasswordDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrongPasswordDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongPasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
