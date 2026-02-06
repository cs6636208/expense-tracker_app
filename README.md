# ระบบบันทึกค่าใช้จ่าย (Expense Tracker) + Firebase

แอปพลิเคชันบันทึกและติดตามค่าใช้จ่ายส่วนบุคคล พร้อม Dashboard แสดงผลแบบ Real-time + **Firebase Backend**

![Expense Tracker](https://img.shields.io/badge/React-18.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-5.0.8-purple) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.0-cyan) ![Firebase](https://img.shields.io/badge/Firebase-10.7.1-orange)

### **ระบบ Authentication**
- Login/Register ด้วย Email & Password
- Session management อัตโนมัติ
- ปลอดภัยด้วย Firebase Authentication
- แสดงชื่อผู้ใช้ในระบบ

### **Cloud Database**
- บันทึกข้อมูลบน Cloud (Firestore)
- **Sync ข้อมูลแบบ Real-time**
- เข้าถึงได้จากทุกเครื่อง
- ข้อมูลไม่สูญหายแม้เปลี่ยนอุปกรณ์

### ระบบนำทาง (Navigation)
แอปมีระบบนำทางแบบ Tab ที่ใช้งานง่าย 5 เมนูหลัก:
1. **เพิ่มรายการ** - ฟอร์มสำหรับเพิ่ม/แก้ไขรายการค่าใช้จ่าย
2. **Dashboard** - ภาพรวมสรุปและรายการล่าสุด
3. **กราฟ** - กราฟวงกลมและกราฟแท่งแสดงข้อมูล
4. **สถิติ** - สถิติเชิงลึกและการวิเคราะห์
5. **รายการทั้งหมด** - รายการค่าใช้จ่ายพร้อมระบบกรอง

**หลังกดบันทึกรายการ** ระบบจะพาไปที่หน้า Dashboard อัตโนมัติ! 

### Dashboard
- แสดงค่าใช้จ่ายรวมทั้งหมด
- จำนวนรายการทั้งหมด
- ค่าเฉลี่ยต่อรายการ
- รายการ 5 รายการล่าสุด
- หมวดหมู่ยอดนิยม Top 5

### กราฟวิเคราะห์
- **กราฟวงกลม (Pie Chart)** - แสดงสัดส่วนค่าใช้จ่ายแยกตามหมวดหมู่
- **กราฟแท่ง (Bar Chart)** - แสดงค่าใช้จ่ายรายเดือน (6 เดือนล่าสุด)

### หน้าสถิติ (Statistics)
- **สถิติรายการ**
  - รายการสูงสุด
  - รายการต่ำสุด
  - วันที่ใช้จ่ายมากที่สุด
- **ค่าเฉลี่ยและคาดการณ์**
  - ค่าเฉลี่ยต่อวัน
  - ค่าเฉลี่ยต่อเดือน (คาดการณ์)
  - ค่าเฉลี่ยต่อปี (คาดการณ์)
- **การกระจายตามหมวดหมู่**
  - แสดงเปอร์เซ็นต์แต่ละหมวด
  - Progress bar แสดงสัดส่วน
  - หมวดหมู่ที่ใช้จ่ายมากที่สุด

### หมวดหมู่ค่าใช้จ่าย (8 หมวด)
- อาหาร
- การเดินทาง
- ช้อปปิ้ง
- ความบันเทิง
- สาธารณูปโภค
- สุขภาพ
- การศึกษา
- อื่นๆ

### ระบบกรอง & เรียงลำดับ
**กรองตามช่วงเวลา:**
- ทั้งหมด
- วันนี้
- 7 วันที่ผ่านมา
- 30 วันที่ผ่านมา
- ปีนี้

**กรองตามหมวดหมู่:**
- เลือกดูเฉพาะหมวดที่ต้องการ

**เรียงลำดับ:**
- วันที่ (ใหม่ → เก่า / เก่า → ใหม่)
- จำนวนเงิน (มาก → น้อย / น้อย → มาก)

### จัดการข้อมูล
- เพิ่ม/แก้ไข/ลบ รายการได้ง่าย
- บันทึกข้อมูลอัตโนมัติด้วย localStorage
- ข้อมูลไม่สูญหายแม้ปิดเบราว์เซอร์

## การติดตั้งและใช้งาน

### ข้อกำหนดระบบ
- Node.js 16+ 
- npm หรือ yarn
- **Firebase Account**

### 1. Clone โปรเจค

```bash
git clone <repository-url>
cd expense-tracker-app
```

### 2. ติดตั้ง Dependencies

```bash
npm install
```

### 3. ตั้งค่า Firebase

**อ่านคู่มือฉบับเต็มได้ที่: [FIREBASE-SETUP.md](./FIREBASE-SETUP.md)**

#### สั้นๆ:
1. สร้างโปรเจค Firebase: [console.firebase.google.com](https://console.firebase.google.com)
2. เปิดใช้งาน **Authentication** (Email/Password)
3. สร้าง **Firestore Database**
4. คัดลอก Firebase Config
5. สร้างไฟล์ `.env`:

```bash
cp .env.example .env
```

6. แก้ไข `.env` ใส่ค่าจาก Firebase:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. รันโปรเจค (Development Mode)

```bash
npm run dev
```

หรือ

```bash
yarn dev
```

เปิดเบราว์เซอร์ที่ `http://localhost:3000`

### 3. Build สำหรับ Production

```bash
npm run build
```

ไฟล์ที่ build เสร็จจะอยู่ในโฟลเดอร์ `dist/`

### 4. Preview Build

```bash
npm run preview
```

## เทคโนโลยีที่ใช้

### Frontend
- **React 18** - UI Library
- **Vite** - Build Tool & Dev Server
- **Tailwind CSS** - Utility-first CSS Framework
- **Recharts** - Chart Library
- **Lucide React** - Icon Library

### Backend & Database
- **Firebase Authentication** - User Authentication
- **Cloud Firestore** - NoSQL Database
- **Firebase Hosting** - Web Hosting (optional)

### Features
- **Real-time Sync** - ข้อมูลอัปเดตทันทีทุกอุปกรณ์
- **Cloud Storage** - เก็บข้อมูลบน Cloud ปลอดภัย
- **Multi-device** - เข้าถึงได้จากทุกเครื่อง

## Deploy

### Firebase Hosting
```bash

npm install -g firebase-tools


firebase login


firebase init hosting


npm run build
firebase deploy
```

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

## การใช้งาน

### 0. สมัครสมาชิก/เข้าสู่ระบบ 
- เปิดแอปครั้งแรกจะเจอหน้า Login
- **สมัครสมาชิก**: กรอกชื่อ, อีเมล, รหัสผ่าน (อย่างน้อย 6 ตัว)
- **เข้าสู่ระบบ**: ใช้อีเมลและรหัสผ่านที่สมัครไว้

### 1. เพิ่มรายการ 
   - กรอกจำนวนเงิน, เลือกหมวดหมู่, ระบุรายละเอียด และเลือกวันที่
   - กดปุ่ม "เพิ่มรายการ"
   - ระบบจะพาไปที่หน้า Dashboard โดยอัตโนมัติ 

2. **ดู Dashboard** 
   - ตรวจสอบสรุปค่าใช้จ่ายแบบรวดเร็ว
   - ดูรายการล่าสุด 5 รายการ
   - เช็คหมวดหมู่ยอดนิยม

3. **ดูกราฟ**
   - คลิกเมนู "กราฟ"
   - ดูกราฟวงกลมแสดงสัดส่วนตามหมวดหมู่
   - ดูกราฟแท่งแสดงแนวโน้มรายเดือน

4. **ดูสถิติ**
   - คลิกเมนู "สถิติ"
   - ดูรายการสูงสุด/ต่ำสุด
   - ดูค่าเฉลี่ยและคาดการณ์
   - เช็คการกระจายตามหมวดหมู่

5. **จัดการรายการ**
   - คลิกเมนู "รายการทั้งหมด"
   - กรองข้อมูลตามช่วงเวลาและหมวดหมู่
   - เรียงลำดับตามวันที่หรือจำนวนเงิน
   - คลิกไอคอนแก้ไข (จะพาไปหน้าฟอร์มอัตโนมัติ)
   - คลิกไอคอนลบเพื่อลบรายการ
