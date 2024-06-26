import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccountDetails} from "../model/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  constructor(private http: HttpClient) { }
  backendHost : string="http://localhost:8085"
  public getAccount(accountId:string, page:number, size:number): Observable<AccountDetails>{
    return this.http.get<AccountDetails>(this.backendHost + "/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);
  }
  public debit(accountId : string, amount : number, desc : string){
    let data = {accountId: accountId, amount: amount, description: desc};
    return this.http.post(this.backendHost + "/accounts/debit", data)
  }
  public credit(accountId : string, amount : number, desc : string){
    let data = {accountId: accountId, amount: amount, description: desc};
    return this.http.post(this.backendHost + "/accounts/credit", data)
  }
  public transfer(accountSource : string, accountDestination : string, amount : number){
    let data = {accountSource : accountSource, accountDestination: accountDestination, amount:amount};
    return this.http.post(this.backendHost + "/accounts/transfer", data)
  }
}
