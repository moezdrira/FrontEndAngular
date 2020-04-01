import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServiceProduitService} from '../Service/service-produit.service';
import {Router} from '@angular/router';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  public produits: any;
  public produit: any;
  userRole:any;
  public currentKeyword: string = '';
  public size: number = 5;
  public currentPage: number = 0;
  public totalPages: number;
  public e:number=0;
  public page: Array<number>;
  public mc: string;
  public exist:boolean=false;
  isSuccessful = false;
  form: any = {};

  public url:string="http://localhost:8080/produits/";
  constructor(private ProduitService: ServiceProduitService, private route: Router, private role: AppComponent) {

  }

  ngOnInit(): void {


  }

  /* onGetProduct() {
     this.ProduitService.getProduct(this.currentPage,this.size).subscribe(data=>{ //observable promise
         this.totalPages=data["page"].totalPages;
         this.page=new Array<number>(this.totalPages);
         this.produits=data;
         },err => {
         console.log(err);
       })

   }*/

  onPageProduct(i: number) {
    this.currentPage = i;
    this.chercherProduit();


  }


  onChercher(form: any) {
    if(this.e==0) {
      this.userRole=this.role.getRole();
      console.log(this.role.roles)
      this.currentPage = 0;
      this.currentKeyword = form.keyword;
      this.chercherProduit();
    }
  }

  chercherProduit() {
    this.ProduitService.getProductByDesignation(this.currentKeyword, this.currentPage, this.size).subscribe(data => { //observable promise

      this.totalPages = data['page'].totalPages;
      this.page = new Array<number>(this.totalPages);
      this.produits = data;

      if(data["_embedded"].produits.length!=0){
        this.exist=true; }
      else this.exist=false;
    }, err => {
      console.log(err);
    });
    //if (this.produits!="") this.exist=false;



  }

  onDeleteProduit(p) {
    let conf=confirm("Etes vous sure?");
    if(conf)
      console.log(p);
    this.ProduitService.DeleteProduit(p._links.self.href).subscribe(data => { //observable promise
      this.chercherProduit();

    }, err => {
      console.log(err);
    });

  }

  onEdit(p: any) {

    this.e=1;
    this.url=p._links.self.href;
    this.ProduitService.getOneProduct(p._links.self.href).subscribe(data => { //observable promise
      console.log(data);
      this.produit=data;

    }, err => {
      console.log(err);
    });

  }
  Editer(p:any)
  {
    this.ProduitService.edit(this.url,p).subscribe(data => { //observable promise
      this.produit=data;
      console.log(this.produit);
      this.isSuccessful = true;

      alert("Mise a jour Effectuer");
      this.e=0;

    }, err => {
      console.log(err);
    });
  }
}
