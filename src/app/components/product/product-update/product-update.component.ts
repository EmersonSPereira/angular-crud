import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';
import { HeaderService } from '../../template/header/header.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product = {
    name: '',
    price: null
  };
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService
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
        this.product = product;
      }
    );
  }

  updateProduct(): void {
    this.productService.update(this.product).subscribe(
      () => {
        this.router.navigate(['produtos']);
        this.productService.showMessage('Produto atualizado com sucesso!');
      }, err => this.productService.showMessage('Falha ao atualizar produto', true));
  }

  cancel(): void {
    this.router.navigate(['produtos']);
  }

}
