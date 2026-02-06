import React from 'react';
import { Filter } from 'lucide-react';
import { CATEGORIES, FILTER_PERIODS, SORT_OPTIONS } from '../utils/constants';

const FilterControls = ({ filterPeriod, filterCategory, sortBy, onFilterChange }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">รายการค่าใช้จ่าย</h2>
        <Filter className="text-gray-600" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ช่วงเวลา
          </label>
          <select
            value={filterPeriod}
            onChange={(e) => onFilterChange('period', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            {FILTER_PERIODS.map(period => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            หมวดหมู่
          </label>
          <select
            value={filterCategory}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">ทั้งหมด</option>
            {CATEGORIES.map(cat => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            เรียงตาม
          </label>
          <select
            value={sortBy}
            onChange={(e) => onFilterChange('sort', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
