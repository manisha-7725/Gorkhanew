import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogView } from './dialog-view';

describe('DialogView', () => {
  let component: DialogView;
  let fixture: ComponentFixture<DialogView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
