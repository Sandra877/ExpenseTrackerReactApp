import React, { useState, useEffect } from "react";
import type { Category } from "../assets/ExpenseData/categories";
import { API_URL } from "../api"; 
import { toast } from "react-toastify";

export type Expense = {
  id: number;
  title?: string;
  categoryId: number | null;
  amount: number;
  currency: string;
  note?: string;
  expenseDate: string;
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editing) setForm(editing);
    else setForm(defaultExpense());
  }, [editing]);

  const handleChange = (key: keyof Expense, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.categoryId) {
      toast.error("Please choose a category");
      return;
    }

    if (!form.amount || Number(form.amount) <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    // Convert categoryId → category name for backend
    const categoryName = categories.find((c) => c.id === form.categoryId)?.name;
    if (!categoryName) {
      toast.error("Invalid category");
      return;
    }

    // Payload for your backend format
    const payload = {
      title: form.title || "Untitled",
      amount: Number(form.amount),
      category: categoryName,
      date: form.expenseDate,
    };

    try {
      setLoading(true);

      // Get the authentication token from localStorage
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error(result);
        toast.error(result.error || "Failed to save expense");
        setLoading(false);
        return;
      }

      toast.success("Expense added!");

      // Update parent UI with original form structure
      onSave({ ...form, amount: Number(form.amount) });

      // Reset form
      setForm(defaultExpense());
    } catch (error) {
      console.error(error);
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 md:p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold text-orange-600 mb-3">
        {editing ? "Edit Expense" : "Add Expense"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* CATEGORY */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={form.categoryId ?? ""}
            onChange={(e) =>
              handleChange("categoryId", e.target.value ? Number(e.target.value) : null)
            }
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

        {/* AMOUNT */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount ({form.currency})
          </label>
          <input
            type="number"
            step="0.01"
            value={form.amount}
            onChange={(e) => handleChange("amount", Number(e.target.value))}
            className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
            placeholder="0.00"
          />
        </div>

        {/* DATE */}
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

      {/* NOTE */}
      <div className="mt-3">
        <label className="block text-sm font-medium text-gray-700">Note (optional)</label>
        <input
          type="text"
          value={form.note}
          onChange={(e) => handleChange("note", e.target.value)}
          className="mt-1 block w-full rounded border-gray-300 px-3 py-2"
          placeholder="e.g., Groceries at Naivas"
        />
      </div>

      {/* BUTTONS */}
      <div className="mt-4 flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Saving..." : editing ? "Save Changes" : "Add Expense"}
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
