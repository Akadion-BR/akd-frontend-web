import { Component, ElementRef, Input, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { SelectOption } from '../models/select-option';
import { fadeInOutAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    }
  ],
  animations: [fadeInOutAnimation]
})
export class CustomSelectComponent implements ControlValueAccessor {
  @Input() id: string = '';
  @Input() informativoCampo: string = '';
  @Input() titulo: string;
  @Input() tabIndex: number;
  @Input() disabledGroup: boolean;
  @Input() options: SelectOption[];
  @Input() valido: boolean;
  @Input() errors: ValidationErrors | null;

  private innerValue: any;

  @ViewChild('select') select: ElementRef;

  public acionaFoco() {
    setTimeout(() => {
      this.select.nativeElement.focus();
    }, 100);
  }

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

  geraMensagemErro(): string {
    if (this.errors?.['required'] != null) {
      return 'Campo obrigatório';
    }
    else {
      return 'Campo inválido';
    }
  }
}
