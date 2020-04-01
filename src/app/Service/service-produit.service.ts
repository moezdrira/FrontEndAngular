import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceProduitService {

  constructor(private httpClient: HttpClient,private auth:TokenStorageService) { }

  public getProduct(page: number,size:number,token:string) {
    let headers=new HttpHeaders({'authorization':token})
    console.log(headers);
    return this.httpClient.get("http://localhost:8080/produits?page="+page+"&size="+size,{headers:headers});

  }
  public getProductByDesignation(mc:string,page:number,size:number) {
    return this.httpClient.get("  http://localhost:8080/produits/search/byDesignationPage?mc="+mc+"&page="+page+"&size="+size);
  }
  public DeleteProduit(url,token:string) {
    let headers=new HttpHeaders({'authorization':this.auth.getToken()})

    return this.httpClient.delete(url,{headers:headers});
  }

  public save(url,data){
    let headers=new HttpHeaders({'authorization':this.auth.getToken()})

    return this.httpClient.post(url,data,{headers:headers});
  }

  public getOneProduct(url) {
    let headers=new HttpHeaders({'authorization':this.auth.getToken()})

    return this.httpClient.get(url,{headers:headers});
  }
  public sendEmail(email) {
    let headers=new HttpHeaders({'authorization':this.auth.getToken()})
    return this.httpClient.get("http://localhost:8080/sendSimpleEmail/"+email,{headers:headers});
  }
  public edit(url,data)
  {
    let headers=new HttpHeaders({'authorization':this.auth.getToken()})

    return this.httpClient.put(url,data,{headers:headers});
  }
}
