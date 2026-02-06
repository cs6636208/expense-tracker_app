# 📁 โครงสร้างโปรเจค Expense Tracker

```
expense-tracker-app/
│
├── 📄 index.html                    # HTML template หลัก
├── 📄 package.json                  # Dependencies และ Scripts
├── 📄 vite.config.js               # Vite configuration
├── 📄 tailwind.config.js           # Tailwind CSS config
├── 📄 postcss.config.js            # PostCSS config
├── 📄 .eslintrc.cjs                # ESLint config
├── 📄 .gitignore                   # Git ignore rules
├── 📄 README.md                    # คู่มือการใช้งาน
│
└── src/                            # ซอร์สโค้ดหลัก
    │
    ├── 📄 main.jsx                 # Entry point ของแอป
    ├── 📄 App.jsx                  # Root component
    │
    ├── components/                 # React Components
    │   ├── 📄 ExpenseTracker.jsx   # Component หลัก (Main Controller)
    │   ├── 📄 DashboardSummary.jsx # Dashboard cards (สรุปค่าใช้จ่าย)
    │   ├── 📄 Charts.jsx           # กราฟวงกลมและแท่ง
    │   ├── 📄 ExpenseForm.jsx      # ฟอร์มเพิ่ม/แก้ไขรายการ
    │   ├── 📄 FilterControls.jsx   # ตัวกรองและเรียงลำดับ
    │   └── 📄 ExpenseList.jsx      # แสดงรายการค่าใช้จ่าย
    │
    ├── utils/                      # Utility Functions
    │   ├── 📄 constants.js         # ค่าคงที่ (หมวดหมู่, ตัวเลือก)
    │   ├── 📄 helpers.js           # ฟังก์ชันช่วยเหลือทั่วไป
    │   └── 📄 storage.js           # localStorage functions
    │
    └── styles/                     # CSS Styles
        └── 📄 index.css            # Global styles + Tailwind imports
```

## 📋 รายละเอียดไฟล์

### 🔧 Configuration Files
| ไฟล์ | หน้าที่ |
|------|---------|
| `package.json` | จัดการ dependencies และ scripts |
| `vite.config.js` | ตั้งค่า Vite build tool |
| `tailwind.config.js` | ปรับแต่ง Tailwind CSS |
| `postcss.config.js` | ตั้งค่า PostCSS plugins |
| `.eslintrc.cjs` | กำหนดกฎการเขียนโค้ด |

### 📦 Components (src/components/)
| Component | ขนาด | ความรับผิดชอบ |
|-----------|------|---------------|
| `ExpenseTracker.jsx` | ~200 บรรทัด | Component หลัก - จัดการ state, navigation และ logic |
| `DashboardSummary.jsx` | ~40 บรรทัด | แสดง 3 cards สรุปข้อมูล |
| `Charts.jsx` | ~45 บรรทัด | กราฟวงกลมและแท่ง |
| `Statistics.jsx` | ~250 บรรทัด | สถิติเชิงลึกและการวิเคราะห์ |
| `ExpenseForm.jsx` | ~90 บรรทัด | ฟอร์มเพิ่ม/แก้ไข |
| `FilterControls.jsx` | ~60 บรรทัด | ตัวเลือกกรองและเรียง |
| `ExpenseList.jsx` | ~65 บรรทัด | แสดงรายการแบบ list |

### 🛠️ Utilities (src/utils/)
| ไฟล์ | ฟังก์ชัน | จุดประสงค์ |
|------|----------|-----------|
| `constants.js` | - | เก็บค่าคงที่ (หมวดหมู่, ตัวเลือก) |
| `helpers.js` | 10+ functions | กรอง, เรียง, คำนวณ, format |
| `storage.js` | 3 functions | load, save, clear localStorage |

### 🎨 Styles
| ไฟล์ | เนื้อหา |
|------|---------|
| `index.css` | Tailwind imports + custom scrollbar |

## 🔄 Data Flow

```
User Interaction (Navigation/Form)
       ↓
ExpenseTracker (Main Component)
       ↓
   ├── State Management
   │   ├── expenses[]
   │   ├── formData
   │   ├── filters
   │   ├── sorting
   │   └── currentView (form/dashboard/charts/stats/list)
   ↓
   ├── helpers.js (กรอง/เรียง/คำนวณ)
   └── storage.js (บันทึก/โหลด)
       ↓
   ├── View Switch Logic
       ↓
   ├── View: Form → ExpenseForm
   ├── View: Dashboard → DashboardSummary + Recent Lists
   ├── View: Charts → DashboardSummary + Charts
   ├── View: Stats → Statistics (detailed analysis)
   └── View: List → FilterControls + ExpenseList

After Save → Auto Switch to Dashboard View ✨
After Edit Click → Auto Switch to Form View ✨
```

## 📊 Component Hierarchy

```
App
 └── ExpenseTracker
      ├── Navigation Menu (5 tabs)
      ├── View: Form
      │   └── ExpenseForm
      ├── View: Dashboard
      │   ├── DashboardSummary
      │   ├── Latest Expenses (5 items)
      │   └── Top Categories (5 items)
      ├── View: Charts
      │   ├── DashboardSummary
      │   └── Charts
      │       ├── PieChart
      │       └── BarChart
      ├── View: Statistics
      │   └── Statistics
      │       ├── Summary Cards
      │       ├── Records (Highest/Lowest/Most Expensive Day)
      │       ├── Averages & Projections
      │       └── Category Breakdown
      └── View: List
          ├── FilterControls
          └── ExpenseList
```

## 🎯 Key Features per File

### ExpenseTracker.jsx
- ✅ State management หลัก
- ✅ Navigation system (5 views)
- ✅ CRUD operations
- ✅ Filter/Sort logic
- ✅ localStorage integration
- ✅ Auto-switch to dashboard after save

### Statistics.jsx
- ✅ Calculate highest/lowest expenses
- ✅ Find most expensive day
- ✅ Calculate daily/monthly/yearly averages
- ✅ Category breakdown with percentages
- ✅ Progress bars for visual representation
- ✅ Highlight most expensive category

### helpers.js
- ✅ `filterByPeriod()` - กรองตามวัน
- ✅ `filterByCategory()` - กรองตามหมวด
- ✅ `sortExpenses()` - เรียงลำดับ
- ✅ `calculateCategoryTotals()` - คำนวณตามหมวด
- ✅ `calculateMonthlyTotals()` - คำนวณรายเดือน
- ✅ `formatCurrency()` - format เงิน
- ✅ `formatDate()` - format วันที่

### storage.js
- ✅ `loadExpenses()` - โหลดจาก localStorage
- ✅ `saveExpenses()` - บันทึกลง localStorage
- ✅ `clearExpenses()` - ลบข้อมูลทั้งหมด

## 📈 ขนาดโปรเจค

- **Total Files:** 19 files
- **Total Components:** 7 components
- **Total Utils:** 3 utility files
- **Lines of Code:** ~1,100-1,200 บรรทัด
- **Bundle Size:** ~250KB (minified)
- **Views:** 5 different views (Form, Dashboard, Charts, Stats, List)
