import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../api";
import { toast } from "react-toastify";

// -------------------- TYPES --------------------
type JwtPayload = {
  id: number;
  email: string;
  role: string;
  exp: number;
  iat: number;
};

type User = {
  id: number;
  email: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
};

type ExpenseFromBackend = {
  id: number;
  title?: string;
  amount: number;
  category?: string;
  date: string;
  note?: string;
};

// -------------------- COMPONENT --------------------
const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUserExpenses, setSelectedUserExpenses] =
    useState<Record<number, ExpenseFromBackend[]>>({});

  // =========================================
  // 🔐 Decode JWT and check admin role
  // =========================================
  const token = localStorage.getItem("token");
  let currentUserRole = "";

  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      currentUserRole = decoded.role;
      console.log("Logged in as:", currentUserRole);
    } catch {
      currentUserRole = "";
    }
  }

  // =========================================
  // 🔥 Load all users
  // =========================================
  useEffect(() => {
    loadUsers();
  }, []);

  const authHeaders = (): HeadersInit => {
    const token = localStorage.getItem("token") || "";
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/users`, {
        method: "GET",
        headers: authHeaders(),
      });

      const json = await res.json();

      if (!res.ok) {
        toast.error(json.error || "Failed to load users");
        return;
      }

      setUsers(json.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Server error loading users");
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // 📌 View expenses for a user
  // =========================================
  const viewExpenses = async (userId: number) => {
    // collapse toggle
    if (selectedUserExpenses[userId]) {
      const updated = { ...selectedUserExpenses };
      delete updated[userId];
      setSelectedUserExpenses(updated);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/admin/user/${userId}/expenses`, {
        method: "GET",
        headers: authHeaders(),
      });

      const json = await res.json();
      if (!res.ok) return toast.error(json.error);

      setSelectedUserExpenses((prev) => ({
        ...prev,
        [userId]: json.data || [],
      }));
    } catch {
      toast.error("Error fetching expenses");
    }
  };

  // =========================================
  // ❌ Delete User
  // =========================================
  const deleteUser = async (userId: number) => {
    if (!confirm("Delete this user and all their expenses?")) return;

    try {
      const res = await fetch(`${API_URL}/api/admin/user/${userId}`, {
        method: "DELETE",
        headers: authHeaders(),
      });

      const json = await res.json();
      if (!res.ok) return toast.error(json.error);

      toast.success("User deleted");
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch {
      toast.error("Error deleting user");
    }
  };

  // =========================================
  // ❌ Delete Expense
  // =========================================
  const deleteExpense = async (expenseId: number, userId: number) => {
    if (!confirm("Delete this expense?")) return;

    try {
      const res = await fetch(`${API_URL}/api/admin/expense/${expenseId}`, {
        method: "DELETE",
        headers: authHeaders(),
      });

      const json = await res.json();
      if (!res.ok) return toast.error(json.error);

      toast.success("Expense deleted");

      setSelectedUserExpenses((prev) => ({
        ...prev,
        [userId]: prev[userId].filter((e) => e.id !== expenseId),
      }));
    } catch {
      toast.error("Error deleting expense");
    }
  };

  // =========================================
  // ⭐ Promote User to Admin
  // =========================================
  const promoteToAdmin = async (userId: number) => {
    if (!confirm("Promote this user to admin?")) return;

    try {
      const res = await fetch(`${API_URL}/api/admin/user/${userId}/promote`, {
        method: "POST",
        headers: authHeaders(),
      });

      const json = await res.json();
      if (!res.ok) return toast.error(json.error);

      toast.success("User promoted to admin");
      loadUsers();
    } catch {
      toast.error("Error promoting user");
    }
  };

  // =========================================
  // UI
  // =========================================
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

      <p className="text-gray-600 mb-4">
        Logged in as: <strong>{currentUserRole}</strong>
      </p>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="w-full border" cellPadding={10}>
          <thead>
            <tr className="bg-gray-100">
              <th>Email</th>
              <th>Role</th>
              <th>Verified</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <React.Fragment key={u.id}>
                <tr>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{u.isVerified ? "✔" : "✖"}</td>
                  <td>{new Date(u.createdAt).toLocaleString()}</td>

                  <td className="flex gap-3">
                    <button onClick={() => viewExpenses(u.id)}>Expenses</button>
                    <button onClick={() => promoteToAdmin(u.id)}>Promote</button>
                    <button
                      onClick={() => deleteUser(u.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>

                {/* Show expenses if expanded */}
                {selectedUserExpenses[u.id] && (
                  <tr>
                    <td colSpan={5}>
                      <div className="bg-gray-50 p-4 rounded">
                        <h3 className="font-semibold mb-2">
                          Expenses for {u.email}
                        </h3>

                        {selectedUserExpenses[u.id].length === 0 ? (
                          <p>No expenses found</p>
                        ) : (
                          selectedUserExpenses[u.id].map((ex) => (
                            <div
                              key={ex.id}
                              className="border-b py-2 flex justify-between"
                            >
                              <div>
                                <strong>
                                  {ex.category} — {ex.title || "Untitled"}
                                </strong>
                                <div>KES {ex.amount}</div>
                                <div>{ex.note}</div>
                              </div>

                              <button
                                onClick={() =>
                                  deleteExpense(ex.id, u.id)
                                }
                                className="text-red-600"
                              >
                                Delete
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
