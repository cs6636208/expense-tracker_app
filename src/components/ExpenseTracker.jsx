import React, { useState, useEffect } from "react";
import {
  DollarSign,
  LayoutDashboard,
  PieChart,
  BarChart3,
  List,
  LogOut,
  User,
} from "lucide-react";
import DashboardSummary from "./DashboardSummary";
import Charts from "./Charts";
import ExpenseForm from "./ExpenseForm";
import FilterControls from "./FilterControls";
import ExpenseList from "./ExpenseList";
import Statistics from "./Statistics";
import { CATEGORIES } from "../utils/constants";
import {
  filterByPeriod,
  filterByCategory,
  sortExpenses,
  calculateCategoryTotals,
  calculateMonthlyTotals,
  getTodayDate,
} from "../utils/helpers";
import {
  subscribeToExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from "../firebase/expenses";

const ExpenseTracker = ({ user, onLogout }) => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    category: CATEGORIES[0].name,
    description: "",
    date: getTodayDate(),
  });

  const [editingId, setEditingId] = useState(null);
  const [filterPeriod, setFilterPeriod] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [currentView, setCurrentView] = useState("form");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToExpenses(user.uid, (expensesData) => {
      const formattedExpenses = expensesData.map((exp) => ({
        id: exp.id,
        amount: exp.amount,
        category: exp.category,
        description: exp.description,
        date: exp.date?.toDate
          ? exp.date.toDate().toISOString().split("T")[0] // 👉 "2026-02-06"
          : exp.date,
      }));

      setExpenses(formattedExpenses);
    });

    return () => unsubscribe();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.description) return;

    setLoading(true);

    try {
      if (editingId) {
        const expenseData = {
          amount: parseFloat(formData.amount),
          category: formData.category,
          description: formData.description,
          date: formData.date,
        };

        await updateExpense(editingId, expenseData);
        setEditingId(null);
      } else {
        const expenseData = {
          amount: parseFloat(formData.amount),
          category: formData.category,
          description: formData.description,
          date: formData.date,
        };

        await addExpense(user.uid, {
          amount: parseFloat(formData.amount),
          category: formData.category,
          description: formData.description,
          date: formData.date,
        });
      }
      resetForm();
      setCurrentView("dashboard");
    } catch (error) {
      console.error("Error saving expense:", error);
      alert("เกิดข้อผิดพลาดในการบันทึก กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (expense) => {
    setFormData({
      amount: expense.amount.toString(),
      category: expense.category,
      description: expense.description,
      date: expense.date,
    });
    setEditingId(expense.id);
    setCurrentView("form");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("คุณต้องการลบรายการนี้ใช่หรือไม่?")) return;

    try {
      await deleteExpense(id);
    } catch (error) {
      console.error("Error deleting expense:", error);
      alert("เกิดข้อผิดพลาดในการลบ กรุณาลองใหม่");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      amount: "",
      category: "อาหาร",
      description: "",
      date: getTodayDate(),
    });
  };

  const handleFilterChange = (type, value) => {
    switch (type) {
      case "period":
        setFilterPeriod(value);
        break;
      case "category":
        setFilterCategory(value);
        break;
      case "sort":
        setSortBy(value);
        break;
    }
  };

  const getFilteredExpenses = () => {
    let filtered = filterByPeriod(expenses, filterPeriod);
    filtered = filterByCategory(filtered, filterCategory);
    return sortExpenses(filtered, sortBy);
  };

  const filteredExpenses = getFilteredExpenses();
  const categoryData = calculateCategoryTotals(filteredExpenses, CATEGORIES);
  const monthlyData = calculateMonthlyTotals(filteredExpenses);

  const navigationItems = [
    { id: "form", label: "เพิ่มรายการ", icon: DollarSign },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "charts", label: "กราฟ", icon: PieChart },
    { id: "stats", label: "สถิติ", icon: BarChart3 },
    { id: "list", label: "รายการทั้งหมด", icon: List },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with User Info */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-900">
            Expense Tracker System
          </h1>

          <div className="flex items-center gap-4">
            <div className="bg-white px-4 py-2 rounded-lg shadow flex items-center gap-2">
              <User size={20} className="text-indigo-600" />
              <span className="font-medium text-gray-700">
                {user?.displayName || user?.email}
              </span>
            </div>
            <button
              onClick={onLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <LogOut size={20} />
              ออกจากระบบ
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="bg-white rounded-lg shadow-lg mb-6 p-2">
          <div className="flex flex-wrap gap-2 justify-center">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    currentView === item.id
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Icon size={20} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Form View */}
        {currentView === "form" && (
          <div className="max-w-2xl mx-auto">
            <ExpenseForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              editingId={editingId}
              onCancel={handleCancel}
              loading={loading}
            />
          </div>
        )}

        {/* Dashboard View */}
        {currentView === "dashboard" && (
          <div>
            <DashboardSummary expenses={filteredExpenses} />

            {filteredExpenses.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  ภาพรวมล่าสุด
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-700">
                      รายการล่าสุด
                    </h3>
                    <div className="space-y-2">
                      {filteredExpenses.slice(0, 5).map((expense) => {
                        const category = CATEGORIES.find(
                          (c) => c.name === expense.category,
                        );
                        return (
                          <div
                            key={expense.id}
                            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: category?.color }}
                              />
                              <span className="font-medium">
                                {expense.description}
                              </span>
                            </div>
                            <span className="text-indigo-600 font-bold">
                              ฿{expense.amount.toLocaleString()}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-700">
                      หมวดหมู่ยอดนิยม
                    </h3>
                    <div className="space-y-2">
                      {categoryData.slice(0, 5).map((cat, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: cat.color }}
                            />
                            <span className="font-medium">{cat.name}</span>
                          </div>
                          <span className="text-indigo-600 font-bold">
                            ฿{cat.value.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {filteredExpenses.length === 0 && (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <DollarSign size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-xl text-gray-500">
                  ยังไม่มีรายการค่าใช้จ่าย
                </p>
                <button
                  onClick={() => setCurrentView("form")}
                  className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                >
                  เพิ่มรายการแรก
                </button>
              </div>
            )}
          </div>
        )}

        {/* Charts View */}
        {currentView === "charts" && (
          <div>
            {filteredExpenses.length > 0 ? (
              <>
                <DashboardSummary expenses={filteredExpenses} />
                <Charts categoryData={categoryData} monthlyData={monthlyData} />
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <PieChart size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-xl text-gray-500">
                  ไม่มีข้อมูลสำหรับแสดงกราฟ
                </p>
                <button
                  onClick={() => setCurrentView("form")}
                  className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                >
                  เพิ่มรายการ
                </button>
              </div>
            )}
          </div>
        )}

        {/* Statistics View */}
        {currentView === "stats" && (
          <div>
            {filteredExpenses.length > 0 ? (
              <Statistics
                expenses={filteredExpenses}
                categoryData={categoryData}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <BarChart3 size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-xl text-gray-500">
                  ไม่มีข้อมูลสำหรับแสดงสถิติ
                </p>
                <button
                  onClick={() => setCurrentView("form")}
                  className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                >
                  เพิ่มรายการ
                </button>
              </div>
            )}
          </div>
        )}

        {/* List View */}
        {currentView === "list" && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <FilterControls
              filterPeriod={filterPeriod}
              filterCategory={filterCategory}
              sortBy={sortBy}
              onFilterChange={handleFilterChange}
            />

            <ExpenseList
              expenses={filteredExpenses}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseTracker;
