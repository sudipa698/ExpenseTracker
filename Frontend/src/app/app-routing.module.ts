import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabContainerComponent } from './tab-container/tab-container.component';
import { BudgetOverviewComponent } from './budget-overview/budget-overview.component';
import { MonthlyExpensesComponent } from './monthly-expenses/monthly-expenses.component';
import { BudgetSummaryComponent } from './budget-summary/budget-summary.component';

const routes: Routes = [
  {
    path: '',
    component: TabContainerComponent,
    children: [
      { path: '', redirectTo: 'budgetOverview', pathMatch: 'full' },
      { path: 'budgetOverview', component: BudgetOverviewComponent },
      { path: 'monthlyExpenses', component: MonthlyExpensesComponent },
      { path: 'budgetSummary', component: BudgetSummaryComponent }
      
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }