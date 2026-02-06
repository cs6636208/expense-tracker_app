import React from "react";
import { Plus } from "lucide-react";
import { CATEGORIES } from "../utils/constants";

const ExpenseForm = ({
  formData,
  setFormData,
  onSubmit,
  editingId,
  onCancel,
  loading,
}) => {
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mx-auto max-w-4xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {editingId ? "แก้ไขรายการ" : "เพิ่มรายการใหม่"}
      </h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            จำนวนเงิน (฿)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => handleChange("amount", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="0.00"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            หมวดหมู่
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            disabled={loading}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            รายละเอียด
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="ระบุรายละเอียด"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            วันที่
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <Plus size={20} />
          {loading
            ? "กำลังบันทึก..."
            : editingId
              ? "บันทึกการแก้ไข"
              : "เพิ่มรายการ"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="w-full bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors font-medium disabled:bg-gray-300"
          >
            ยกเลิก
          </button>
        )}
      </form>
    </div>
  );
};

export default ExpenseForm;
