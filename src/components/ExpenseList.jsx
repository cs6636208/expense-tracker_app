import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { CATEGORIES } from '../utils/constants';
import { formatCurrency, formatDate } from '../utils/helpers';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  if (expenses.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        ยังไม่มีรายการค่าใช้จ่าย
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto">
      {expenses.map(expense => {
        const category = CATEGORIES.find(c => c.name === expense.category);
        
        return (
          <div
            key={expense.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: category?.color }}
                />
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {expense.description}
                  </p>
                  <p className="text-sm text-gray-600">
                    {expense.category} • {formatDate(expense.date)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 ml-4">
              <p className="text-lg font-bold text-indigo-600 whitespace-nowrap">
                ฿{formatCurrency(expense.amount)}
              </p>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => onEdit(expense)}
                  className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                  title="แก้ไข"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => onDelete(expense.id)}
                  className="text-red-600 hover:text-red-800 transition-colors p-1"
                  title="ลบ"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExpenseList;
