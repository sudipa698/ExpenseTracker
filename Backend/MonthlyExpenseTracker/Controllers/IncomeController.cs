using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MonthlyExpenseTracker.Models;

namespace MonthlyExpenseTracker.Controllers
{
    [Route("")]
    [ApiController]
    public class IncomeController : ControllerBase
    {
        private readonly ExpenseTrackerDbContext _context;

        public IncomeController(ExpenseTrackerDbContext context)
        {
            _context = context;
        }

        [HttpGet("getincomes")]
        public IEnumerable<Income> Get()
        {
            return _context.Incomes.ToList();
        }
    }
}
