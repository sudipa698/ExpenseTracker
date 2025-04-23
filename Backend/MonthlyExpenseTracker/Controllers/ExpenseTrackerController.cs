using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MonthlyExpenseTracker.Models;

namespace MonthlyExpenseTracker.Controllers
{
    [Route("")]
    [ApiController]
    public class ExpenseTrackerController : ControllerBase
    {
        private readonly ExpenseTrackerDbContext _context;
        public ExpenseTrackerController(ExpenseTrackerDbContext context)
        {
            _context = context;
        }

        [HttpGet("getexpenses")]
        public IEnumerable<Expense> GetAllExpenses()
        {
            return _context.Expenses.ToList();
        }

        [HttpPost("addexpenses")]
        public IEnumerable<Expense> AddExpense(Expense expense)
        {
            _context.Expenses.Add(expense);
            _context.SaveChanges();
            return _context.Expenses.ToList();
        }

        [HttpPut("editexpenses")]
        public IEnumerable<Expense> Editexpense(Expense expense)
        {
            Expense e = _context.Expenses.FirstOrDefault((e) => e.Id == expense.Id);
            if (e != null) { 
                e.ProjectedCost = expense.ProjectedCost;
                e.ActualCost = expense.ActualCost;
                e.Month = expense.Month;
                e.Category = expense.Category;
                e.SubCategory = expense.SubCategory;
            }
            _context.SaveChanges();
            return _context.Expenses.ToList(); 
        }
    }
}
