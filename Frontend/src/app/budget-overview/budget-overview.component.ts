import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HotTableRegisterer } from '@handsontable/angular';
import Gantt from 'frappe-gantt';
import { Expense } from 'src/Models/expense';


@Component({
  selector: 'app-budget-overview',
  templateUrl: './budget-overview.component.html',
  styleUrl: './budget-overview.component.css'
})
export class BudgetOverviewComponent implements OnInit {
  @ViewChild('gantt') ganttElement!: ElementRef;

  gantt: any;
  hotId = 'budgetSummary';
  showBalanceButtonClicked = false;
  projectedBalance = 0;
  actualBalance = 0;
  settings = {
    colHeaders: ['Source', 'Actual Income', "Projected Income"],
    columns: [
      { data: 'source', type: 'text' },
      { data: 'actualIncome', type: 'numeric' },
      { data: 'projectedIncome', type: 'numeric' },
    ],
    rowHeaders: true,
    contextMenu: true, // Enables right-click options
  };

  private hotRegisterer = new HotTableRegisterer();

  expenses = [];
  incomes = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
    this.fetchExpenses();
    this.fetchIncome();

  }

  initializeGantt(): void {
    const tasks: any[] = [];
    let index = 1;
    let totalExpense = 0;
    this.expenses.forEach((e: any) => {
      totalExpense += e.actualCost;
    });
    this.expenses.forEach((e: any) => {
      const obj = {
        id: +index,
        name: e.subCategory,
        start: '2024-01-01',
        end: '2024-01-31',
        progress: (e.actualCost / totalExpense) * 100,
        expense: e.actualCost
      };
      tasks.push(obj);
      index++;
    })
    // Initialize Gantt chart
    this.gantt = new Gantt("#gantt", tasks, {
      view_mode: "Day",
      date_format: 'YYYY-MM-DD',
      on_click: function (task: any) {
        alert(`Expense for ${task.name}: $${task.expense}`);
      },
    });
  }

  // Add custom styles for different categories

  fetchExpenses(): void {
    this.http.get<Expense[]>('https://localhost:7203/getexpenses')
      .subscribe({
        next: (data: any) => {
          // this.updateGrid(data);
          this.expenses = data;
          this.initializeGantt();

        },
        error: (err: any) => console.error('Error fetching expenses:', err)
      });
  }

  fetchIncome(): void {
    this.http.get<Expense[]>('https://localhost:7203/getincomes')
      .subscribe({
        next: (data: any) => {
          // this.updateGrid(data);

          this.incomes = data;
          this.hotRegisterer.getInstance(this.hotId).loadData(data);

        },
        error: (err: any) => console.error('Error fetching incomes:', err)
      });
  }
  
  CalculateBalance(): void {
    let actualCost = 0;
    let projectedCost = 0;
    this.expenses.forEach((e: any) =>  {
      actualCost += e.actualCost;
      projectedCost += e.projectedCost;
    });
    
    let actualIncome = 0, projectedIncome = 0;
    this.incomes.forEach((i: any) => {
      actualIncome += i.actualIncome;
      projectedIncome += i.projectedIncome;
    })
    this.actualBalance = actualIncome - actualCost;
    this.projectedBalance = projectedIncome - projectedCost;
    this.showBalanceButtonClicked = true;
    
  }
}
