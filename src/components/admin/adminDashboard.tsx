import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../../api";

interface User {
  id: number;
  email: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
}

interface Expense {
  id: number;
  title: string | null;
  amount: number;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  // ---------------- USERS ----------------
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/users`, { headers });

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const json = await res.json();
      setUsers(json.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users ❌");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- EXPENSES ----------------
  const fetchExpenses = async (user: User) => {
    setSelectedUser(user);

    try {
      const res = await fetch(
        `${API_URL}/api/admin/user/${user.id}/expenses`,
        { headers }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch expenses");
      }

      const json = await res.json();
      setExpenses(json.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load expenses ❌");
    }
  };

  // ---------------- DELETE USER ----------------
const deleteUser = async (id: number) => {
  if (!window.confirm("Delete this user?")) return;

  try {
    const res = await fetch(`${API_URL}/api/admin/user/${id}`, {
      method: "DELETE",
      headers,
    });

    if (!res.ok) throw new Error();

    setUsers((prev) => prev.filter((u) => u.id !== id));
    setSelectedUser(null);
    setExpenses([]);

    toast.success("User deleted successfully ✅");
  } catch {
    toast.error("Failed to delete user ❌");
  }
};


  // ---------------- PROMOTE USER ----------------
  const promoteUser = async (id: number) => {
  if (!window.confirm("Promote this user to admin?")) return;

  try {
    const res = await fetch(`${API_URL}/api/admin/user/${id}/promote`, {
      method: "POST",
      headers,
    });

    if (!res.ok) throw new Error();

    toast.success("User promoted to admin ✅");

    // refresh list so role updates
    fetchUsers();
  } catch {
    toast.error("Failed to promote user ❌");
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <p className="text-center mt-20">Loading admin data...</p>;
  }

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-orange-50 py-10 px-6">
      <h1 className="text-4xl font-extrabold text-orange-600 text-center mb-10">
        Admin Dashboard
      </h1>

      {/* USERS TABLE */}
      <div className="bg-white rounded-xl shadow-lg border border-orange-200 p-6">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
          Registered Users
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-orange-100 text-left text-orange-700">
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Verified</th>
              <th className="p-3">Created</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className="border-b hover:bg-orange-50 transition"
              >
                <td className="p-3">{u.email}</td>
                <td className="p-3 font-medium">{u.role}</td>
                <td className="p-3">{u.isVerified ? "✅" : "❌"}</td>
                <td className="p-3">
                  {new Date(u.createdAt).toLocaleString()}
                </td>
                <td className="p-3 flex gap-2 flex-wrap">
                  <button
                    data-cy="view-expenses-btn"
                    onClick={() => fetchExpenses(u)}
                    className="px-3 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
                  >
                    Expenses
                  </button>

                  {u.role !== "admin" && (
                    <button
                      data-cy="promote-user-btn"
                      onClick={() => promoteUser(u.id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                      Promote
                    </button>
                  )}

                  <button
                    data-cy="delete-user-btn"
                    onClick={() => deleteUser(u.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EXPENSES */}
      {selectedUser && (
        <div className="mt-10 bg-white rounded-xl shadow-lg border border-orange-200 p-6">
          <h2 className="text-xl font-semibold text-orange-600 mb-4">
            Expenses for {selectedUser.email}
          </h2>

          {expenses.length === 0 ? (
            <p className="text-gray-500">No expenses found.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {expenses.map((e) => (
                <div
                  key={e.id}
                  className="border rounded-lg p-4 bg-orange-50"
                >
                  <p className="font-semibold text-gray-800">
                    {e.title || "Untitled"}
                  </p>
                  <p className="text-orange-600 font-bold">
                    KES {e.amount}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
