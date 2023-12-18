import { Component, ViewChild, ElementRef, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { fadeInOutAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'app-custom-slider',
  templateUrl: './custom-slider.component.html',
  styleUrls: ['./custom-slider.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSliderComponent),
      multi: true
    }
  ],
  animations: [fadeInOutAnimation]
})
export class CustomSliderComponent {

  @Input() id: string = '';
  @Input() informativoCampo: string = '';
  @Input() titulo: string = '';
  @Input() tabIndex: number;
  @Input() checked: boolean;

  private innerValue: any;

  get value() {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCb(v);
    }
  }

  onChangeCb: (_: any) => void = () => { };
  onTouchCb: (_: any) => void = () => { };

  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchCb = fn;
  }

  writeValue(v: any) {
    this.value = v;
  }

  teste() {

  }
}
