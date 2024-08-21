import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceEditDialogComponent } from './invoice-edit-dialog.component';

describe('InvoiceEditDialogComponent', () => {
  let component: InvoiceEditDialogComponent;
  let fixture: ComponentFixture<InvoiceEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
