import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInventoryItemComponent } from './edit-inventory-item.component';

describe('EditInventoryItemComponent', () => {
  let component: EditInventoryItemComponent;
  let fixture: ComponentFixture<EditInventoryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInventoryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInventoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
