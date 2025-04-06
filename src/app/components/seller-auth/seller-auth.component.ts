import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from 'src/app/data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit{

  constructor(private seller:SellerService) {}

  ngOnInit():void {
    this.seller.reloadSeller();
  }

  signUp(data: SignUp): void {
    this.seller.userSignUp(data);
  }

  authError: string = '';
  Login(data: SignUp): void {
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      if(isError) {
        this.authError = "Sorry! Invalid Credentials";
      }
    })
  }

  showLogin = false;
  openLogin() {
    this.showLogin=true;
  }

  openSignUp() {
    this.showLogin=false;
  }

}
