import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportData } from './report-data';

describe('ReportData', () => {
  let component: ReportData;
  let fixture: ComponentFixture<ReportData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
