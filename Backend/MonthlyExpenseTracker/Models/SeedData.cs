using System;
using System.Diagnostics;
using System.Linq;
namespace MonthlyExpenseTracker.Models
{


    namespace ContosoUniversity.Data
    {
        public static class SeedData
        {
            public static void Initialize(ExpenseTrackerDbContext context)
            {
                context.Database.EnsureCreated();

                // Look for any students.
                if (context.Incomes.Any())
                {
                    return;   // DB has been seeded
                }

                var incomes = new Income[]
                {
            new Income {
                Source = "Salary",
                Month = "Jan",
                ActualIncome = 12300,
                ProjectedIncome = 10000
            },
            new Income {
                Source = "Bonus",
                Month = "Jan",
                ActualIncome = 1000,
                ProjectedIncome = 1000
            }
                };
                foreach (Income s in incomes)
                {
                    context.Incomes.Add(s);
                }
                context.SaveChanges();

                var expenses = new Expense[]
                {
            new Expense{Category = "Food", SubCategory = "Restaurant", Month = "Jan", ActualCost = 1200, ProjectedCost = 1000},
            
                };
                foreach (Expense c in expenses)
                {
                    context.Expenses.Add(c);
                }
                context.SaveChanges();

               
            }
        }
    }
}
