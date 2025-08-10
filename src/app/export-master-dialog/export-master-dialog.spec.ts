import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportMasterDialog } from './export-master-dialog';

describe('ExportMasterDialog', () => {
  let component: ExportMasterDialog;
  let fixture: ComponentFixture<ExportMasterDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportMasterDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportMasterDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
