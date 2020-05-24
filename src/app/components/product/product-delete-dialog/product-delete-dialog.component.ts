import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../product.model';
import { ProductReadComponent } from '../product-read/product-read.component';
import { ProductService } from '../product.service';
import { ProgressService } from '../../template/progress/progress.service';

@Component({
  selector: 'app-product-delete-dialog',
  templateUrl: './product-delete-dialog.component.html',
  styleUrls: ['./product-delete-dialog.component.css']
})
export class ProductDeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProductReadComponent>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private progressService: ProgressService) { }

  ngOnInit(): void {
  }

  confirmDelete() {
    this.progressService.progress.show = true;
    this.productService.delete(this.data.id).subscribe(() => {
      this.progressService.progress.show = false;
      this.productService.showMessage('Deletado com sucesso');
      this.dialogRef.close();
    }, err => {
      this.productService.showMessage('Falha ao deletar produto', true)
      this.progressService.progress.show = false;
    });
  }
}

