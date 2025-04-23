using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MonthlyExpenseTracker.Migrations
{
    /// <inheritdoc />
    public partial class InititalMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Expenses",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SubCategory = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Month = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ActualCost = table.Column<int>(type: "int", nullable: false),
                    ProjectedCost = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Expenses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Incomes",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Source = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Month = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ActualIncome = table.Column<int>(type: "int", nullable: false),
                    ProjectedIncome = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Incomes", x => x.ID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Expenses");

            migrationBuilder.DropTable(
                name: "Incomes");
        }
    }
}
