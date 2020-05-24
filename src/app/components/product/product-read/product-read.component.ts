import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductDeleteDialogComponent } from '../product-delete-dialog/product-delete-dialog.component';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ProductRead2DataSource } from './product-read-datasource';
import { ProgressService } from '../../template/progress/progress.service';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Product>;
  dataSource: ProductRead2DataSource;

  constructor(private productService: ProductService, public dialog: MatDialog, private progressService: ProgressService) { }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'price', 'action'];

  ngOnInit() {
    this.loadTable();
  }

  loadTable() {
    this.progressService.progress.show = true;
    this.productService.read().subscribe(products => {
      this.progressService.progress.show = false;
      this.dataSource = new ProductRead2DataSource();
      this.dataSource.data = products;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    }, err => {
      this.productService.showMessage('Falha ao buscar produtos', true);
      this.progressService.progress.show = false;
    });
  }

  openDialog(productSelected: Product) {
    const dialogRef = this.dialog.open(ProductDeleteDialogComponent, {
      data: productSelected
    });

    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => { // esse timout é necessário pois o heroku demora um pouco menos de 1 seg para atualizar o db.json apos deleção
        this.loadTable();
      }, 1000);
    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
