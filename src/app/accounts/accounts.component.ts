import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";
import {catchError, Observable, throwError} from "rxjs";
import {AccountDetails} from "../model/account.model";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit{
  accountFormGroup! : FormGroup;
  currentPage : number=0
  pageSize : number=5
  account! : Observable<AccountDetails>
  operationFormGroup! : FormGroup;
  errorMessage! : string;
  accountId! : string;
  constructor(private fb : FormBuilder, private accountService: AccountsService,
              private router : Router, public authService : AuthService) {}
  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId : this.fb.control("")
    });
    this.operationFormGroup = this.fb.group({
      opType : this.fb.control(null),
      amount : this.fb.control(0),
      description : this.fb.control(null),
      accountDestination : this.fb.control(null)
    })
  }

  handleSearchAccount() {
    this.accountId = this.accountFormGroup?.value.accountId;
    this.account = this.accountService.getAccount(this.accountId, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message
        return throwError(err);
      })
    );
  }

  goTopage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount()
  }

  handleAccountOperation() {
    this.accountId = this.accountFormGroup?.value.accountId;
    let opType = this.operationFormGroup?.value.opType;
    let amount : number = this.operationFormGroup?.value.amount;
    let description : string = this.operationFormGroup?.value.description;
    let accountDestination : string = this.operationFormGroup?.value.accountDestination;
    if(opType=="DEBIT"){
      this.accountService.debit(this.accountId, amount, description).subscribe({
        next : (data)=>{
          alert("success debit");
          this.operationFormGroup.reset();
          this.handleSearchAccount()
        },
        error : (err)=>{
          console.log(err);
        }
      });
    }
    else if(opType=="CREDIT"){
      this.accountService.credit(this.accountId, amount, description).subscribe({
        next : (data)=>{
          alert("success credit");
          this.operationFormGroup.reset();
          this.handleSearchAccount()
        },
        error : (err)=>{
          console.log(err);
        }
      });
    }
    else if(opType=="TRANSFER"){
      this.accountService.transfer(this.accountId, accountDestination, amount).subscribe({
        next : (data)=>{
          alert("success transfer");
          this.operationFormGroup.reset();
          this.handleSearchAccount()
        },
        error : (err)=>{
          console.log(err);
        }
      });
    }
  }
}
