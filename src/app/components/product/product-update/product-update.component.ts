import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from '../../template/header/header.service';
import { ProgressService } from '../../template/progress/progress.service';
import { priceValidator } from '../product-validator';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  form = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    price: [null, [Validators.required, priceValidator]]
  });
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private progressService: ProgressService, 
    private fb: FormBuilder
  ) {
    this.headerService.headerData = {
      title: 'Editar Produto',
      icon: 'edit',
      routerUrl: `./produtos/atualizar/${this.route.snapshot.paramMap.get('id')}`
    };
  }

  ngOnInit(): void {
    this.productService.readById(this.route.snapshot.paramMap.get('id')).subscribe(
      product => {
        this.form.patchValue(product);
      }
    );
  }

  updateProduct(): void {
    this.progressService.progress.show = true;
    this.productService.update(this.form.value).subscribe(
      () => {
        this.progressService.progress.show = false;
        this.router.navigate(['produtos']);
        this.productService.showMessage('Produto atualizado com sucesso!');
      }, err => {
        this.productService.showMessage('Falha ao atualizar produto', true)
        this.progressService.progress.show = false;
      });
  }

  cancel(): void {
    this.router.navigate(['produtos']);
  }

}
