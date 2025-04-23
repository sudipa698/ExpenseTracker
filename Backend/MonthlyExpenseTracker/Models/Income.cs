namespace MonthlyExpenseTracker.Models
{
    public class Income
    {
        public int ID { get; set; }
        public string Source { get; set; }

        public string Month { get; set; }

        public int ActualIncome { get; set; }

        public int ProjectedIncome { get; set; }
    }
}
