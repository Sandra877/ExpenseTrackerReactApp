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
  // 🔥 1. LOAD EXPENSES ON PAGE LOAD
  // ----------------------------------------------------
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${API_URL}/api/expenses`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const response = await res.json();

        if (!res.ok) {
          toast.error(response.error || "Failed to fetch expenses");
          return;
        }

        const items = response.data; // backend sends { data: [...] }

        const converted = items.map((item: any) => {
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

    fetchExpenses();
  }, []);

  // ----------------------------------------------------
  // 🔥 2. ADD or EDIT EXPENSE (POST or PUT)
  // ----------------------------------------------------
  const handleSave = async (expense: Expense) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Not authenticated");
      return;
    }

    const categoryName = categories.find(c => c.id === expense.categoryId)?.name;

    const payload = {
      title: expense.title || "Untitled",
      amount: expense.amount,
      category: categoryName,
      date: expense.expenseDate,
      note: expense.note || "",
    };

    try {
      if (editing) {
        // UPDATE (PUT)
        const res = await fetch(`${API_URL}/api/expenses/${expense.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        const updated = await res.json();

        if (!res.ok) {
          toast.error(updated.error || "Failed to update expense");
          return;
        }

        toast.success("Expense updated!");
        setEditing(null);

        // Refresh expenses from backend to ensure we have the latest data
        // and avoid duplicates
        const fetchUpdatedExpenses = async () => {
          try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const res = await fetch(`${API_URL}/api/expenses`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            const response = await res.json();

            if (!res.ok) {
              toast.error(response.error || "Failed to fetch updated expenses");
              return;
            }

            const items = response.data;
            const converted = items.map((item: any) => {
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
            toast.error("Error loading updated expenses");
          }
        };

        await fetchUpdatedExpenses();
      } else {
        // CREATE (POST)
        const res = await fetch(`${API_URL}/api/expenses`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        const created = await res.json();

        if (!res.ok) {
          toast.error(created.error || "Failed to add expense");
          return;
        }

        toast.success("Expense added!");

        // Refresh expenses from backend to ensure we have the latest data
        // and avoid duplicates
        const fetchUpdatedExpenses = async () => {
          try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const res = await fetch(`${API_URL}/api/expenses`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            const response = await res.json();

            if (!res.ok) {
              toast.error(response.error || "Failed to fetch updated expenses");
              return;
            }

            const items = response.data;
            const converted = items.map((item: any) => {
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
            toast.error("Error loading updated expenses");
          }
        };

        await fetchUpdatedExpenses();
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  // ----------------------------------------------------
  // 🔥 3. DELETE EXPENSE
  // ----------------------------------------------------
  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/api/expenses/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const error = await res.json();
      toast.error(error.error || "Failed to delete expense");
      return;
    }

    toast.success("Expense deleted");
    setExpenses(prev => prev.filter(e => e.id !== id));

    if (editing && editing.id === id) {
      setEditing(null);
    }
  };

  // ----------------------------------------------------
  // UI
  // ----------------------------------------------------
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 via-white to-orange-100">
      <Navbar />

      <section className="text-center py-16 px-6 bg-gradient-to-r from-orange-100 to-orange-50 border-b border-orange-200">
        <Wallet className="w-16 h-16 text-orange-500 mb-4 animate-bounce" />
        <h1 className="text-5xl font-extrabold text-orange-600 mb-3">
          Welcome to <span className="text-gray-800">ExpenseMate</span>
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg">
          Track your spending. Stay in control. Build your financial confidence.
        </p>
      </section>

      <main className="flex flex-col items-center flex-grow py-12 px-6">
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
