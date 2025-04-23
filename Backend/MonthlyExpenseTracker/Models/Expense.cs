namespace MonthlyExpenseTracker.Models
{
    public class Expense
    {
        public long Id { get; set; }
        public string Category { get; set; }

        public string SubCategory { get; set; }

        public string Month { get; set; }

        public int ActualCost { get; set; }

        public int ProjectedCost { get; set; }
        public Expense() { }

    }
}
