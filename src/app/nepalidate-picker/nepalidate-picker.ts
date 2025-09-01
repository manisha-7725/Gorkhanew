
import { formatDate } from '@angular/common';
import {
  Component,
  OnInit,
  forwardRef,
  Input,
  ElementRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MasterRepo } from '../master-repo';
import adbs from 'ad-bs-converter';
declare var jQuery: any;

@Component({
  selector: 'app-nepalidate-picker',
  templateUrl: './nepalidate-picker.html',
  styleUrls: ['./nepalidate-picker.css'],

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NepalidatePicker),
      multi: true,
    },
  ],
})
export class NepalidatePicker implements OnInit{
  private onChange: (value: string[]) => void = () => {};
  private onTouch: any = () => {};
  public disableBefore = '';
  public dateControl = new FormControl();
  public date: any; //ad s
  dateBS: any;
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() disable: boolean = false;
  @Input() max: boolean = true;
  // @Output() tab =  new EventEmitter();
  DBS: any;
   mfgDate: string = '';        
  mfgNepaliDate: string = '';

  constructor(private elementRef: ElementRef, public masterRepo: MasterRepo) {}

  ngOnInit() {
    // this.isNullOrEmpty(this.id);
    var today = new Date();
    this.mfgDate = today.toISOString().split('T')[0];
    this.date = formatDate(today, 'yyyy-MM-dd', 'en-US');
    this.changeDate(this.date, 'AD');
  }
  
  ngAfterViewInit() {
    var _this = this;

    jQuery(document).ready(function () {
      jQuery(document).on('click', `#${_this.id}`, function () {
        document.getElementById(`${_this.id}Picker`);
      });
    });

    jQuery(document).ready(function () {
      jQuery(document).on('focus', `#${_this.id}Picker`, function () {
        jQuery(`#${_this.id}Picker`).nepaliDatePicker({
          language: 'english',
          onChange: function () {

            _this.dateControl.setValue(jQuery(`#${_this.id}Picker`).val());
            
            _this.propagateChange(_this.dateControl.value);
            document.getElementById(`${_this.id}Picker`);
          },
          dateFormat: 'DD/MM/YYYY',
          readOnlyInput: false,
          disableAfter: _this.dateBS,
          ndpYear: true,
          ndpMonth: true,
          ndpYearCount: 5,
        });
      });
    });
  }


  changeDate(value: any, format: string) {
    if (format == 'AD') {
      var adDate = value.replace('-', '/').replace('-', '/');
      var bsDate = adbs.ad2bs(adDate);
      if (this.max == true) {
        this.dateBS = this.masterRepo.toBSDate(value);
      } else {
        this.dateBS = null;
      }
    } else if (format == 'BS') {
      var datearr = value.split('/');
      const bsDate = datearr[2] + '/' + datearr[1] + '/' + datearr[0];
      var adDate = adbs.bs2ad(bsDate);

      this.date = this.masterRepo.toADDate(value);
    }
  }

  writeValue = (obj: any): void => {
    this.dateControl.setValue(obj); //update input
  };
  registerOnChange = (_fn: any): void => {
    this.onChange = _fn; // call when value change
  };

  registerOnTouched = (_fn: any): void => {
    this.onTouch = _fn;
  };

  private propagateChange = (value: any) => {
    this.onChange(value); // notify for change value & update
    this.onTouch(value);
    this.elementRef.nativeElement.dispatchEvent(
      new CustomEvent('change', { detail: { value: value }, bubbles: true })
    );
  };

 
}
