USE [ExpenseTracker]
GO
SET IDENTITY_INSERT [dbo].[Expenses] ON 

INSERT [dbo].[Expenses] ([Id], [Category], [SubCategory], [Month], [ActualCost], [ProjectedCost]) VALUES (1, N'Food', N'Restaurant', N'Jan', 10000, 2000)
INSERT [dbo].[Expenses] ([Id], [Category], [SubCategory], [Month], [ActualCost], [ProjectedCost]) VALUES (2, N'Transportation', N'Bus', N'Jan', 1202, 1200)
INSERT [dbo].[Expenses] ([Id], [Category], [SubCategory], [Month], [ActualCost], [ProjectedCost]) VALUES (3, N'Education', N'Book', N'January', 1230, 1200)
INSERT [dbo].[Expenses] ([Id], [Category], [SubCategory], [Month], [ActualCost], [ProjectedCost]) VALUES (4, N'Food', N'Grocery', N'Jan', 1230, 1200)
INSERT [dbo].[Expenses] ([Id], [Category], [SubCategory], [Month], [ActualCost], [ProjectedCost]) VALUES (5, N'Medical', N'Medicine', N'Jan', 2000, 1500)
INSERT [dbo].[Expenses] ([Id], [Category], [SubCategory], [Month], [ActualCost], [ProjectedCost]) VALUES (6, N'Entertainment', N'Concerts', N'Jan', 1000, 1000)
INSERT [dbo].[Expenses] ([Id], [Category], [SubCategory], [Month], [ActualCost], [ProjectedCost]) VALUES (7, N'Food', N'Sweets', N'Jan', 1000, 500)
INSERT [dbo].[Expenses] ([Id], [Category], [SubCategory], [Month], [ActualCost], [ProjectedCost]) VALUES (8, N'Education', N'Colors', N'Jan', 1200, 0)
SET IDENTITY_INSERT [dbo].[Expenses] OFF
GO
SET IDENTITY_INSERT [dbo].[Incomes] ON 

INSERT [dbo].[Incomes] ([ID], [Source], [Month], [ActualIncome], [ProjectedIncome]) VALUES (1, N'Salary', N'Jan', 30000, 30000)
INSERT [dbo].[Incomes] ([ID], [Source], [Month], [ActualIncome], [ProjectedIncome]) VALUES (2, N'Performance Bonus', N'Jan', 10000, 0)
SET IDENTITY_INSERT [dbo].[Incomes] OFF
GO
