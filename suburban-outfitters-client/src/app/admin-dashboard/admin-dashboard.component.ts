import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1; 
  
  constructor(private router: Router) {
    this.navLinks = [
      {
          label: 'Manage Customers',
          link: '/admin-dashboard/manage-customers',
          index: 0
      },{
          label: 'Manage Products',
          link: '/admin-dashboard/manage-products',
          index: 2
      },{
          label: 'Manage Suppliers',
          link: '/admin-dashboard/manage-suppliers',
          index: 3
      }  
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
        this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}
