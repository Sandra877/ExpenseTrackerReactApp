import { Footer } from "../components/footer/Footer";
import Navbar from "../components/nav/Navbar";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { categories } from "../assets/ExpenseData/categories";
import { useState } from "react";
import type { Expense } from "../components/AddExpenseForm";
import { Wallet, TrendingUp } from "lucide-react"; // optional icons

const LandingPage = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editing, setEditing] = useState<Expense | null>(null);

  const handleSave = (expense: Expense) => {
    if (editing) {
      setExpenses((prev) =>
        prev.map((e) => (e.id === expense.id ? expense : e))
      );
      setEditing(null);
    } else {
      setExpenses((prev) => [expense, ...prev]);
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditing(expense);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: number) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    if (editing && editing.id === id) setEditing(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 via-white to-orange-100">
      {/* 🧭 Navbar */}
      <Navbar />

      {/* 🌅 Hero Section */}
      <section className="text-center py-16 px-6 bg-gradient-to-r from-orange-100 to-orange-50 border-b border-orange-200">
        <div className="flex flex-col items-center justify-center">
          <Wallet className="w-16 h-16 text-orange-500 mb-4 animate-bounce" />
          <h1 className="text-5xl font-extrabold text-orange-600 mb-3">
            Welcome to <span className="text-gray-800">ExpenseMate</span>
          </h1>
          <p className="text-gray-700 max-w-2xl text-lg leading-relaxed">
            Stay in control of your money. Track every shilling with ease and
            visualize your financial story beautifully.
          </p>
        </div>
      </section>

      {/* 💰 Expense Form Section */}
      <main className="flex flex-col items-center flex-grow py-12 px-6">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-4xl border border-orange-100 transform transition-all hover:scale-[1.01] hover:shadow-orange-200/80">
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

        {/* 💹 Expense List Section */}
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
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </main>

      {/* 🧡 Motivation Section */}
      <section className="text-center bg-orange-50 mt-16 py-12 px-6 shadow-inner">
        <h3 className="text-3xl font-bold text-orange-700 mb-2">
          Smart Spending Starts Here 💡
        </h3>
        <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Every small expense you track builds a clearer picture of your
          financial future. Stay consistent, and let ExpenseMate guide your way.
        </p>
      </section>

      {/* 🌇 Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
