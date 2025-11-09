import React from "react";
import type { Category } from "../assets/ExpenseData/categories";
import type { Expense } from "./AddExpenseForm";

type Props = {
  expense: Expense;
  category?: Category | null;
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
};

const ExpenseItem: React.FC<Props> = ({ expense, category, onEdit, onDelete }) => {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <div className="text-sm font-semibold">{category ? category.name : "Uncategorized"}</div>
        <div className="text-xs text-gray-500">{expense.note}</div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-lg font-bold text-orange-600">Ksh {expense.amount.toFixed(2)}</div>
          <div className="text-xs text-gray-500">{expense.expenseDate}</div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(expense)}
            className="px-3 py-1 rounded bg-white border text-sm hover:bg-orange-50"
          >
            Edit
          </button>
          <button
            onClick={() => {
              if (confirm("Delete this expense?")) onDelete(expense.id);
            }}
            className="px-3 py-1 rounded bg-red-100 text-red-700 text-sm hover:bg-red-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseItem;
