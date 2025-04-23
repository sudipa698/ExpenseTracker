import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HotTableModule } from '@handsontable/angular';
import { registerAllModules } from 'handsontable/registry';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MonthlyExpensesComponent } from './monthly-expenses/monthly-expenses.component';
import { TabContainerComponent } from './tab-container/tab-container.component';
import { RouterModule } from '@angular/router';
import { BudgetOverviewComponent } from './budget-overview/budget-overview.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { BudgetSummaryComponent } from './budget-summary/budget-summary.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';


// register Handsontable's modules
registerAllModules();

@NgModule({
  imports: [BrowserModule, HotTableModule, RouterModule, AppRoutingModule, FormsModule, NgbModule, HttpClientModule, MatTableModule, MatSortModule],
  declarations: [ AppComponent, TabContainerComponent, BudgetOverviewComponent, MonthlyExpensesComponent, BudgetSummaryComponent ],
  bootstrap: [ AppComponent ],
  providers: [
    provideAnimationsAsync()
  ]
})

export class AppModule { }