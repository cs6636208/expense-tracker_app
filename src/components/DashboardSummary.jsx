import React from 'react';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const DashboardSummary = ({ expenses }) => {
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">ค่าใช้จ่ายรวม</p>
            <p className="text-3xl font-bold text-indigo-600">
              ฿{formatCurrency(totalExpenses)}
            </p>
          </div>
          <TrendingUp className="text-indigo-600" size={40} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">จำนวนรายการ</p>
            <p className="text-3xl font-bold text-green-600">{expenses.length}</p>
          </div>
          <Calendar className="text-green-600" size={40} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">ค่าเฉลี่ยต่อรายการ</p>
            <p className="text-3xl font-bold text-orange-600">
              ฿{formatCurrency(averageExpense)}
            </p>
          </div>
          <DollarSign className="text-orange-600" size={40} />
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
