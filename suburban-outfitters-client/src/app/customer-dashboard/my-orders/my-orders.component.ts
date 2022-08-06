import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  @Input() orders: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
