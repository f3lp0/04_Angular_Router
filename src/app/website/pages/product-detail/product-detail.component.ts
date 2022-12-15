import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

// navegación en ruta desde servicio de angular:
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {

  productId: string | null = null;
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    // Los switchMap se pueden ir anidando como then en promesas
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.productId = params.get('id');
        if (this.productId){
          return this.productsService.getOne(this.productId)
        }
        return [null];
      })
    )
    .subscribe(data => {
        this.product = data;
    });
  }

  goToBack(){
    // Ir hacia atrás en una página
    this.location.back();
  }
}
