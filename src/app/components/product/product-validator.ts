import { AbstractControl } from '@angular/forms';

export function priceValidator(control: AbstractControl): { [key: string]: boolean } | null{
  return control.value > 0 ? null : {priceValidator: true };
}
