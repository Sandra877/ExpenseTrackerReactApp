import React, { useState, useEffect } from "react";
import type { Category } from "../assets/ExpenseData/categories";


export type Expense = {
  id: number;
  title?: string;
  categoryId: number | null;
  amount: number;
  currency: string;
  note?: string;
  expenseDate: string; // ISO date yyyy-mm-dd
};

type Props = {
  categories: Category[];
  onSave: (expense: Expense) => void;
  editing?: Expense | null;
  onCancelEdit?: () => void;
};




const defaultExpense = (): Expense => ({
  id: Date.now(),
  title: "",
  categoryId: null,
  amount: 0,
  currency: "KES",
  note: "",
  expenseDate: new Date().toISOString().slice(0, 10),
});

const AddExpenseForm: React.FC<Props> = ({ categories, onSave, editing, onCancelEdit }) => {
  const [form, setForm] = useState<Expense>(defaultExpense());

  useEffect(() => {
    if (editing) setForm(editing);
    else setForm(defaultExpense());
  }, [editing]);

  const handleChange = (k: keyof Expense, v: any) =>
    setForm((s) => ({ ...s, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.categoryId) {
      alert("Please choose a category");
      return;
    }
    if (!form.amount || Number(form.amount) <= 0) {
      alert("Please enter an amount > 0");
      return;
    }
    onSave({ ...form, amount: Number(form.amount) });
    setForm(defaultExpense());
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 md:p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold text-orange-600 mb-3">
        {editing ? "Edit Expense" : "Add Expense"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={form.categoryId ?? ""}
            onChange={(e) => handleChange("categoryId", e.target.value ? Number(e.target.value) : null)}
            className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Amount ({form.currency})</label>
          <input
            type="number"
            step="0.01"
            value={form.amount}
            onChange={(e) => handleChange("amount", Number(e.target.value))}
            className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={form.expenseDate}
            onChange={(e) => handleChange("expenseDate", e.target.value)}
            className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
          />
        </div>
      </div>

      <div className="mt-3">
        <label className="block text-sm font-medium text-gray-700">Note (optional)</label>
        <input
          type="text"
          value={form.note}
          onChange={(e) => handleChange("note", e.target.value)}
          className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
          placeholder="e.g., Groceries at Nakumatt"
        />
      </div>

      <div className="mt-4 flex gap-3">
        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded"
        >
          {editing ? "Save Changes" : "Add Expense"}
        </button>

        {editing && onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default AddExpenseForm;
