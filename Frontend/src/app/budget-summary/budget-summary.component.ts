import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Expense } from 'src/Models/expense';

@Component({
  selector: 'app-budget-summary',
  templateUrl: './budget-summary.component.html',
  styleUrl: './budget-summary.component.css'
})
export class BudgetSummaryComponent {
  constructor(private http: HttpClient) { }
  categories = new Set<string>();
  displayedColumns: string[] = ['subcategory', 'actualCost', 'projectedCost'];
  expenses = new MatTableDataSource<Expense>([]);
  allExpenses: any[] = [];
  selectedOption = 'All';
  
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.expenses.sort = this.sort;
  }
  
  setData(data: any): void {
    this.expenses.data = data;
    this.allExpenses = data;
    data.forEach((e: any) => {
      this.categories.add(e.category);
    })
  }
  
  fetchData(): void {
    this.http.get<Expense[]>('https://localhost:7203/getexpenses')
      .subscribe({
        next: (data: any) => {
          this.setData(data);          
        },
        error: (err: any) => console.error('Error fetching expenses:', err)
      });
  }
  
  ngOnInit(): void {
    this.fetchData();
    document.getElementById(this.selectedOption)?.classList.toggle('active');
  }
  
  
  selectCategory(event: any): void {
    // console.log(this.allExpenses, event);
    // document.getElementById()
    document.getElementById(this.selectedOption)?.classList.toggle('active');
    if (event !== 'All') {
      this.expenses.data = this.allExpenses.filter((e) => e.category === event);
    } else {
      this.expenses.data = this.allExpenses;
    }
    // console.log(event, this.expenses.data);
    this.selectedOption = event;
    document.getElementById(this.selectedOption)?.classList.toggle('active');
    
  }
}
