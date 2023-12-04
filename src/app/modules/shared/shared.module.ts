import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomInputComponent } from './inputs/custom-input/custom-input.component';
CustomDateInputComponent
import { CustomErrorComponent } from './inputs/custom-error/custom-error.component';

import { MatIconModule } from '@angular/material/icon';
import { CustomDateInputComponent } from './inputs/custom-date-input/custom-date-input.component';
import { CustomSelectComponent } from './inputs/custom-select/custom-select.component';

@NgModule({
  declarations: [
    CustomInputComponent,
    CustomErrorComponent,
    CustomDateInputComponent,
    CustomSelectComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule
  ],
  exports: [
    CustomInputComponent,
    CustomErrorComponent,
    CustomDateInputComponent,
    CustomSelectComponent
  ]
})
export class SharedModule { }
