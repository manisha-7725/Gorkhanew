import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NepalidatePicker } from './nepalidate-picker';

describe('NepalidatePicker', () => {
  let component: NepalidatePicker;
  let fixture: ComponentFixture<NepalidatePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NepalidatePicker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NepalidatePicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
