import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  Target,
  Award,
} from "lucide-react";
import { formatCurrency, formatDate } from "../utils/helpers";

const Statistics = ({ expenses, categoryData }) => {
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const averageExpense =
    expenses.length > 0 ? totalExpenses / expenses.length : 0;

  const sortedByAmount = [...expenses].sort((a, b) => b.amount - a.amount);
  const highestExpense = sortedByAmount[0];
  const lowestExpense = sortedByAmount[sortedByAmount.length - 1];

  const mostExpensiveCategory =
    categoryData.length > 0
      ? categoryData.reduce((prev, current) =>
          prev.value > current.value ? prev : current,
        )
      : null;

  const dates = expenses.map((e) => new Date(e.date));
  const minDate = dates.length > 0 ? new Date(Math.min(...dates)) : new Date();
  const maxDate = dates.length > 0 ? new Date(Math.max(...dates)) : new Date();
  const daysDiff = Math.max(
    1,
    Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)) + 1,
  );
  const dailyAverage = totalExpenses / daysDiff;

  const monthlyAverage = (totalExpenses / daysDiff) * 30;

  const expensesByDate = {};
  expenses.forEach((exp) => {
    if (!expensesByDate[exp.date]) {
      expensesByDate[exp.date] = 0;
    }
    expensesByDate[exp.date] += exp.amount;
  });

  const mostExpensiveDay = Object.entries(expensesByDate).sort(
    (a, b) => b[1] - a[1],
  )[0];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <DollarSign className="text-indigo-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">ค่าใช้จ่ายรวม</p>
              <p className="text-2xl font-bold text-indigo-600">
                ฿{formatCurrency(totalExpenses)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-100 p-3 rounded-lg">
              <Target className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">ค่าเฉลี่ยต่อรายการ</p>
              <p className="text-2xl font-bold text-green-600">
                ฿{formatCurrency(averageExpense)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Calendar className="text-orange-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">จำนวนรายการ</p>
              <p className="text-2xl font-bold text-orange-600">
                {expenses.length} รายการ
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Records */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            <Award className="text-indigo-600" />
            สถิติรายการ
          </h3>

          <div className="space-y-4">
            {highestExpense && (
              <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-50 rounded-r">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="text-red-600" size={20} />
                  <p className="font-semibold text-gray-800">รายการสูงสุด</p>
                </div>
                <p className="text-gray-700">{highestExpense.description}</p>
                <p className="text-sm text-gray-600">
                  {highestExpense.category} • {formatDate(highestExpense.date)}
                </p>
                <p className="text-2xl font-bold text-red-600 mt-1">
                  ฿{formatCurrency(highestExpense.amount)}
                </p>
              </div>
            )}

            {lowestExpense && (
              <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded-r">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingDown className="text-green-600" size={20} />
                  <p className="font-semibold text-gray-800">รายการต่ำสุด</p>
                </div>
                <p className="text-gray-700">{lowestExpense.description}</p>
                <p className="text-sm text-gray-600">
                  {lowestExpense.category} • {formatDate(lowestExpense.date)}
                </p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  ฿{formatCurrency(lowestExpense.amount)}
                </p>
              </div>
            )}

            {mostExpensiveDay && (
              <div className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50 rounded-r">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="text-purple-600" size={20} />
                  <p className="font-semibold text-gray-800">
                    วันที่ใช้จ่ายมากที่สุด
                  </p>
                </div>
                <p className="text-gray-700">
                  {formatDate(mostExpensiveDay[0])}
                </p>
                <p className="text-2xl font-bold text-purple-600 mt-1">
                  ฿{formatCurrency(mostExpensiveDay[1])}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Averages & Projections */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            <TrendingUp className="text-indigo-600" />
            ค่าเฉลี่ยและคาดการณ์
          </h3>

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">ค่าเฉลี่ยต่อวัน</p>
              <p className="text-3xl font-bold text-blue-600">
                ฿{formatCurrency(dailyAverage)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                คำนวณจาก {daysDiff} วัน
              </p>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">
                ค่าเฉลี่ยต่อเดือน (คาดการณ์)
              </p>
              <p className="text-3xl font-bold text-indigo-600">
                ฿{formatCurrency(monthlyAverage)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                ประมาณการจากข้อมูลปัจจุบัน
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">
                ค่าเฉลี่ยต่อปี (คาดการณ์)
              </p>
              <p className="text-3xl font-bold text-purple-600">
                ฿{formatCurrency(monthlyAverage * 12)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                ประมาณการจากข้อมูลปัจจุบัน
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          <DollarSign className="text-indigo-600" />
          การกระจายตามหมวดหมู่
        </h3>

        <div className="space-y-3">
          {categoryData.map((cat, idx) => {
            const percentage = (cat.value / totalExpenses) * 100;
            return (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="font-medium text-gray-800">
                      {cat.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-indigo-600">
                      ฿{formatCurrency(cat.value)}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Most Expensive Category Highlight */}
      {mostExpensiveCategory && (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">
                หมวดหมู่ที่ใช้จ่ายมากที่สุด
              </p>
              <h3 className="text-3xl font-bold mb-2">
                {mostExpensiveCategory.name}
              </h3>
              <p className="text-xl">
                ฿{formatCurrency(mostExpensiveCategory.value)}
              </p>
              <p className="text-sm opacity-90 mt-1">
                คิดเป็น{" "}
                {((mostExpensiveCategory.value / totalExpenses) * 100).toFixed(
                  1,
                )}
                % ของค่าใช้จ่ายทั้งหมด
              </p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-full">
              <Award size={48} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
