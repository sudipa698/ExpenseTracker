
using Microsoft.EntityFrameworkCore;

namespace MonthlyExpenseTracker.Models
{
    
        public class ExpenseTrackerDbContext : DbContext
        {
            public ExpenseTrackerDbContext(DbContextOptions<ExpenseTrackerDbContext> options) : base(options)
            {
            }

            public DbSet<Income> Incomes { get; set; }
            public DbSet<Expense> Expenses { get; set; }

            
        }
 }

        

