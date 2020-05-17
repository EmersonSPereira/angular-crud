import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './view/home/home.component';
import { ProductCrudComponent } from './view/product-crud/product-crud.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';


const routes: Routes = [{
  path: '',
  component: HomeComponent
},
{
  path: 'produtos',
  component: ProductCrudComponent
},
{
  path: 'produtos/cadastrar',
  component: ProductCreateComponent
},
{
  path: 'produtos/atualizar/:id',
  component: ProductUpdateComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
