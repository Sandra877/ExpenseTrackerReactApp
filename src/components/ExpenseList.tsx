import React from "react";
import ExpenseItem from "./ExpenseItem";
import type { Expense } from "./AddExpenseForm";
import type { Category } from "../assets/ExpenseData/categories";

/**
 * expenses are grouped by month -> date (yyyy-mm)
 * input: expenses[] sorted descending by date or unsorted
 */

type Props = {
  expenses: Expense[];
  categories: Category[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
};

const groupByMonthThenDate = (expenses: Expense[]) => {
  const byMonth: Record<string, Record<string, Expense[]>> = {};
  // Remove duplicates by ID first
  const uniqueExpenses = expenses.filter((expense, index, self) =>
    index === self.findIndex((e) => e.id === expense.id)
  );
  // sort descending by date
  const sorted = [...uniqueExpenses].sort((a, b) => (a.expenseDate < b.expenseDate ? 1 : -1));
  sorted.forEach((e) => {
    const month = e.expenseDate.slice(0, 7); // yyyy-mm
    const date = e.expenseDate; // full
    if (!byMonth[month]) byMonth[month] = {};
    if (!byMonth[month][date]) byMonth[month][date] = [];
    byMonth[month][date].push(e);
  });
  return byMonth;
};

const monthLabel = (monthKey: string) => {
  // monthKey = "2025-10"
  const [y, m] = monthKey.split("-");
  const date = new Date(Number(y), Number(m) - 1, 1);
  return date.toLocaleString(undefined, { month: "long", year: "numeric" });
};

const ExpenseList: React.FC<Props> = ({ expenses, categories, onEdit, onDelete }) => {
  console.log("ExpenseList received expenses:", expenses);
  const grouped = groupByMonthThenDate(expenses);
  console.log("ExpenseList grouped data:", grouped);

  return (
    <div className="space-y-6">
      {Object.keys(grouped).length === 0 && (
        <div className="text-center text-gray-500">No expenses yet — add one to get started.</div>
      )}

      {Object.entries(grouped).map(([month, dates]) => (
        <div key={month} className="bg-white rounded shadow p-4">
          <h3 className="text-xl font-bold text-orange-600 mb-3">{monthLabel(month)}</h3>

          {Object.entries(dates).map(([date, items]) => (
            <div key={date} className="mb-4">
              <div className="text-sm font-semibold text-gray-700 mb-2">{date}</div>
              <div className="divide-y">
                {items.map((ex) => (
                  <ExpenseItem
                    key={ex.id}
                    expense={ex}
                    category={categories.find((c) => c.id === ex.categoryId) ?? null}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
