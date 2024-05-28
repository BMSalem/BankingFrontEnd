import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Customer} from "../model/customer.model";

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrl: './customer-accounts.component.css'
})
export class CustomerAccountsComponent implements OnInit{
  customer! : Customer;
  constructor(private router: Router) {
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }
  ngOnInit(): void {
  }

}
