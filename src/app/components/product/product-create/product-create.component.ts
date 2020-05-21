import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { priceValidator } from '../product-validator';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  form = this.fb.group({
    name: ['', [Validators.required]],
    price: [null, [Validators.required, priceValidator]]
  });
  constructor(private productService: ProductService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.router.navigate(['/produtos']);
  }

  createProduct(): void {
    if (this.form.valid) {
      this.productService.create(this.form.value).subscribe(
        () => {
          this.productService.showMessage('Sucesso ao cadastrar produto');
          this.router.navigate(['/produtos']);
        }, err => this.productService.showMessage('Falha ao cadastrar produto', true));
    } else {
      this.form.markAllAsTouched();
    }
  }
}
