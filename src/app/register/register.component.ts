import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {ServiceProduitService} from '../Service/service-produit.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  email:any;

  constructor(private authService: AuthService,private serviceP:ServiceProduitService) { }

  ngOnInit() {
  }


  sendMailRegister(email) {
    console.log(email);
    this.serviceP.sendEmail(email).subscribe(data=>
      {
        console.log("testMail");
      },
    err => {
console.log(err);
    });

  }

  onSubmit() {
    this.sendMailRegister(this.form.email)
    this.authService.register(this.form).subscribe(
      data => {

        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
