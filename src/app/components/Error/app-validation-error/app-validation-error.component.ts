import { NgIf } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-error',
  imports: [NgIf],
  templateUrl: './app-validation-error.component.html',
  styleUrl: './app-validation-error.component.css',
})
export class AppValidationErrorComponent {
  @Input() control: AbstractControl | null = null;
}
