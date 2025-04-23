import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrl: './tab-container.component.css'
})
export class TabContainerComponent implements OnInit{
  activeTab = 'budgetOverview';

  constructor(private router: Router) {
    // Update active tab based on current route
    
  }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      const url = this.router.url;
      if (url.includes('budgetOverview')) {
        this.activeTab = 'budgetOverview';
      } else if (url.includes('monthlyExpenses')) {
        this.activeTab = 'monthlyExpenses';
      } else if (url.includes('budgetSummary')) {
        this.activeTab = 'budgetSummary';
      }
    });
  }
  
  navigate(tab: string) {
    this.router.navigate([tab]);
    this.activeTab = tab;
  }
}
