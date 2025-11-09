import { Footer } from "../components/footer/Footer";
import Navbar from "../components/nav/Navbar";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { categories } from "../assets/ExpenseData/categories";
import { useState } from "react";
import type { Expense } from "../components/AddExpenseForm";

const LandingPage = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editing, setEditing] = useState<Expense | null>(null);

  const handleSave = (expense: Expense) => {
    // If editing, update existing expense
    if (editing) {
      setExpenses((prev) =>
        prev.map((e) => (e.id === expense.id ? expense : e))
      );
      setEditing(null);
    } else {
      // Otherwise add new
      setExpenses((prev) => [expense, ...prev]);
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditing(expense);
    window.scrollTo({ top: 0, behavior: "smooth" }); // optional, scroll up to form
  };

  const handleDelete = (id: number) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    if (editing && editing.id === id) setEditing(null);
  };

  return (
    <div className="bg-orange-50 min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto p-4">
        {/* Expense Form */}
        <AddExpenseForm
          categories={categories}
          onSave={handleSave}
          editing={editing}
          onCancelEdit={() => setEditing(null)}
        />

        {/* Expense List */}
        <div className="mt-6">
          <ExpenseList
            expenses={expenses}
            categories={categories}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
