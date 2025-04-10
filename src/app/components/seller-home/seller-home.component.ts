import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[]
  productMessage: undefined | string;
  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id:number) {
    console.warn("test id", id);
    this.product.deleteProduct(id).subscribe((result) =>{
      if(result) {
        this.productMessage = "Product is Deleted";
        this.list();
      }
    });

    setTimeout(() => {
      this.productMessage=undefined
    }, 3000);
  }

  list() {
    this.product.productList().subscribe((result) => {
      console.warn(result);
      if(result){
        this.productList=result;
      }
    });
  }

}
