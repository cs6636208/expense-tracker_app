export const CATEGORIES = [
  { name: 'อาหาร', color: '#FF6384' },
  { name: 'การเดินทาง', color: '#36A2EB' },
  { name: 'ช้อปปิ้ง', color: '#FFCE56' },
  { name: 'ความบันเทิง', color: '#4BC0C0' },
  { name: 'สาธารณูปโภค', color: '#9966FF' },
  { name: 'สุขภาพ', color: '#FF9F40' },
  { name: 'การศึกษา', color: '#FF6384' },
  { name: 'อื่นๆ', color: '#C9CBCF' }
];

export const FILTER_PERIODS = [
  { value: 'all', label: 'ทั้งหมด' },
  { value: 'today', label: 'วันนี้' },
  { value: 'week', label: '7 วันที่ผ่านมา' },
  { value: 'month', label: '30 วันที่ผ่านมา' },
  { value: 'year', label: 'ปีนี้' }
];

export const SORT_OPTIONS = [
  { value: 'date-desc', label: 'วันที่ (ใหม่-เก่า)' },
  { value: 'date-asc', label: 'วันที่ (เก่า-ใหม่)' },
  { value: 'amount-desc', label: 'จำนวนเงิน (มาก-น้อย)' },
  { value: 'amount-asc', label: 'จำนวนเงิน (น้อย-มาก)' }
];
