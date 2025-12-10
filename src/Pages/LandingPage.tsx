import { useEffect, useState } from "react";
import Navbar from "../components/nav/Navbar";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { Footer } from "../components/footer/Footer";
import { categories } from "../assets/ExpenseData/categories";

import type { Expense } from "../components/AddExpenseForm";
import { Wallet, TrendingUp } from "lucide-react";
import { API_URL } from "../api";
import { toast } from "react-toastify";

const LandingPage = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editing, setEditing] = useState<Expense | null>(null);

  // ----------------------------------------------------
  //  Load all expenses on page load
  // ----------------------------------------------------
  const loadExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${API_URL}/api/expenses`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to load expenses");
        return;
      }

      const converted = data.data.map((item: any) => {
        const categoryObj = categories.find(c => c.name === item.category);

        return {
          id: item.id,
          title: item.title,
          amount: item.amount,
          note: item.note || "",
          currency: "KES",
          expenseDate: item.date,
          categoryId: categoryObj ? categoryObj.id : null,
        };
      });

      setExpenses(converted);
    } catch (error) {
      console.error(error);
      toast.error("Error loading expenses");
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  // ----------------------------------------------------
  // 2️⃣ Add or Edit an expense
  // ----------------------------------------------------
  const handleSave = async (expense: Expense) => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Not authenticated");

    const categoryName = categories.find(c => c.id === expense.categoryId)?.name;

    const payload = {
      title: expense.title || "Untitled",
      amount: expense.amount,
      category: categoryName,
      date: expense.expenseDate,
      note: expense.note || "",
    };

    try {
      let res;
      let data;

      if (editing) {
        // PUT UPDATE
        res = await fetch(`${API_URL}/api/expenses/${expense.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        data = await res.json();

        if (!res.ok) {
          toast.error(data.error || "Failed to update expense");
          return;
        }

        toast.success("Expense updated!");
        setEditing(null);

      } else {
        // POST CREATE
        res = await fetch(`${API_URL}/api/expenses`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        data = await res.json();

        if (!res.ok) {
          toast.error(data.error || "Failed to add expense");
          return;
        }

        toast.success("Expense added!");
      }

      // Load fresh list after change
      await loadExpenses();

    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  // ----------------------------------------------------
  // 3️⃣ Delete expense
  // ----------------------------------------------------
  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch(`${API_URL}/api/expenses/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || "Failed to delete");
      return;
    }

    toast.success("Expense deleted");
    loadExpenses();
  };

  // ----------------------------------------------------
  // UI
  // ----------------------------------------------------
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-orange-50 via-white to-orange-100">
      <Navbar />

      <section className="text-center py-16 px-6 bg-linear-to-r from-orange-100 to-orange-50 border-b border-orange-200">
        <Wallet className="w-16 h-16 text-orange-500 mb-4 animate-bounce" />
        <h1 className="text-5xl font-extrabold text-orange-600 mb-3">
          Welcome to <span className="text-gray-800">ExpenseMate</span>
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg">
          Track your spending. Stay in control. Build your financial confidence.
        </p>
      </section>

      <main className="flex flex-col items-center grow py-12 px-6">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-4xl border border-orange-100">
          <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
            {editing ? "Edit Expense" : "Add a New Expense"}
          </h2>

          <AddExpenseForm
            categories={categories}
            onSave={handleSave}
            editing={editing}
            onCancelEdit={() => setEditing(null)}
          />
        </div>

        <div className="mt-12 w-full max-w-5xl">
          <h3 className="text-2xl font-semibold text-orange-700 mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-orange-500" />
            Your Expense Summary
          </h3>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-orange-100">
            {expenses.length === 0 ? (
              <p className="text-center text-gray-600 italic">
                No expenses yet — start by adding one above ✨
              </p>
            ) : (
              <ExpenseList
                expenses={expenses}
                categories={categories}
                onEdit={setEditing}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
