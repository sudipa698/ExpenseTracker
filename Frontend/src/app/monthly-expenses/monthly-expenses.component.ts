import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HotTableRegisterer } from '@handsontable/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Expense } from 'src/Models/expense';


@Component({
  selector: 'app-monthly-expenses',
  templateUrl: './monthly-expenses.component.html',
  styleUrl: './monthly-expenses.component.css'
})
export class MonthlyExpensesComponent implements OnInit {
  isFormVisible = false;
  private hotRegisterer = new HotTableRegisterer();
  hotId = 'hotTableInstance';

  dataset: any[] = [];

  expense = {
    id: 0,
    category: '',
    subcategory: '',
    month: '',
    actualCost: '',
    projectedCost: ''
  };

  settings = {
    colHeaders: ['Id', 'Category', 'SubCategory', 'Month', 'Actual Cost', "Projected Cost"],
    columns: [
      { data: 'id', type: 'numeric' },
      { data: 'category', type: 'text' },
      { data: 'subCategory', type: 'text' },
      { data: 'month', type: 'text' },
      { data: 'actualCost', type: 'numeric' },
      { data: 'projectedCost', type: 'numeric' },
    ],
    //stretchH: 'all',
    rowHeaders: true,
    contextMenu: true, // Enables right-click options
    afterChange: (changes: any, source: string) => {
      if (source === 'edit') {
        changes.forEach(([row, prop, oldValue, newValue]: any) => {
          const editedData = this.dataset.find(x => x.id === (row + 1));
          // console.log(editedData);
          editedData[prop] = newValue;
          console.log(editedData);
          this.editData(editedData);
        });
      }
    }
  };



  constructor(private modalService: NgbModal, private http: HttpClient) { }

  onSubmit() {
    const userInput: any = {
      category: this.expense.category,
      subCategory: this.expense.subcategory,
      month: this.expense.month,
      actualCost: this.expense.actualCost,
      projectedCost: this.expense.projectedCost
    }
    this.addData(userInput);
    this.fetchData();
    //document.getElementById('hotTable').data = [this.]
    // Handle form submission

    // const combinedArray = [...this.dataset, userInput];
    // // console.log(combinedArray);
    // this.hotRegisterer.getInstance(this.hotId).loadData(combinedArray);
  }

  toggleForm(formContent: any): void {
    this.expense = {
      id: 0,
      category: '',
      subcategory: '',
      month: '',
      actualCost: '',
      projectedCost: ''
    };
    this.modalService.open(formContent);
    this.isFormVisible = !this.isFormVisible;
  }


  ngOnInit(): void {
    this.fetchData();
  }
  
  fetchData(): void {
    this.http.get<Expense[]>('https://localhost:7203/getexpenses')
      .subscribe({
        next: (data: any) => {
          this.updateGrid(data);
        },
        error: (err: any) => console.error('Error fetching expenses:', err)
      });
  }

  addData(userInput: Expense): void {
    this.http.post<Expense>('https://localhost:7203/addexpenses', userInput)
      .subscribe({
        next: (data: any) => {
          this.updateGrid(data);
        },
        error: (err: any) => console.error('Error fetching expenses:', err)
      });
  }

  updateGrid(data: any): void {
    const hot = this.hotRegisterer.getInstance(this.hotId);
    if (hot) {
      this.dataset = data;
      hot.loadData(data); // Dynamically updates the table
    }
  }
  
  editData(editedData: Expense): void {
    this.http.put<Expense>('https://localhost:7203/editexpenses', editedData)
      .subscribe({
        next: (data: any) => {
          this.updateGrid(data);
        },
        error: (err: any) => console.error('Error fetching expenses:', err)
      });
  }

}
