# 🔥 คู่มือติดตั้ง Firebase

## 📋 ขั้นตอนการติดตั้ง Firebase

### 1️⃣ สร้าง Firebase Project

1. ไปที่ [Firebase Console](https://console.firebase.google.com)
2. คลิก **"Add project"** หรือ **"เพิ่มโปรเจกต์"**
3. ตั้งชื่อโปรเจกต์ เช่น `expense-tracker`
4. ปิด Google Analytics (ไม่จำเป็นสำหรับโปรเจกต์นี้)
5. คลิก **"Create project"**

---

### 2️⃣ เพิ่ม Web App

1. ในหน้า Project Overview คลิกไอคอน **Web** (`</>`)
2. ตั้งชื่อแอป เช่น `Expense Tracker Web`
3. **ไม่ต้อง** เลือก Firebase Hosting (ขั้นนี้)
4. คลิก **"Register app"**
5. **คัดลอก** ค่า configuration ที่แสดงขึ้นมา

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "expense-tracker-xxxxx.firebaseapp.com",
  projectId: "expense-tracker-xxxxx",
  storageBucket: "expense-tracker-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxx"
};
```

---

### 3️⃣ ตั้งค่า Authentication

1. ในเมนูด้านซ้าย คลิก **"Build"** → **"Authentication"**
2. คลิก **"Get started"**
3. เลือก **"Email/Password"**
4. เปิดใช้งาน **"Email/Password"** (toggle on)
5. คลิก **"Save"**

---

### 4️⃣ สร้าง Firestore Database

1. ในเมนูด้านซ้าย คลิก **"Build"** → **"Firestore Database"**
2. คลิก **"Create database"**
3. เลือก **"Start in production mode"** หรือ **"Start in test mode"**
   - **Test mode** (แนะนำสำหรับเริ่มต้น): ใครก็เข้าถึงได้ 30 วัน
   - **Production mode**: ต้องตั้งค่า rules
4. เลือก Location (แนะนำ: **asia-southeast1** สำหรับไทย)
5. คลิก **"Enable"**

---

### 5️⃣ ตั้งค่า Firestore Rules (สำคัญ!)

1. ไปที่ **Firestore Database** → แท็บ **"Rules"**
2. แทนที่ rules ด้วยโค้ดนี้:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // กฎสำหรับ expenses collection
    match /expenses/{expenseId} {
      // อนุญาตให้อ่าน/เขียนได้เฉพาะเจ้าของข้อมูล
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      // อนุญาตให้สร้างได้เฉพาะเจ้าของ
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

3. คลิก **"Publish"**

---

### 6️⃣ ตั้งค่าในโปรเจกต์

1. **คัดลอก** ไฟล์ `.env.example` เป็น `.env`

```bash
cp .env.example .env
```

2. **แก้ไข** ไฟล์ `.env` ใส่ค่าจาก Firebase Config:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=expense-tracker-xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=expense-tracker-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=expense-tracker-xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:xxxxx
```

3. **ติดตั้ง dependencies**

```bash
npm install
```

4. **รันโปรเจกต์**

```bash
npm run dev
```

---

## ✅ ทดสอบการทำงาน

### 1. สมัครสมาชิก
- เปิดแอป
- คลิก **"สมัครสมาชิก"**
- กรอกข้อมูล:
  - ชื่อ: `Test User`
  - อีเมล: `test@example.com`
  - รหัสผ่าน: `password123` (อย่างน้อย 6 ตัว)
- คลิก **"สมัครสมาชิก"**

### 2. ตรวจสอบใน Firebase Console
- ไปที่ **Authentication** → แท็บ **"Users"**
- ควรเห็นผู้ใช้ใหม่

### 3. เพิ่มรายการค่าใช้จ่าย
- เพิ่มรายการทดสอบ
- ไปที่ **Firestore Database**
- ควรเห็น collection `expenses` ถูกสร้างขึ้น

---

## 🚀 Deploy บน Firebase Hosting

### ติดตั้ง Firebase CLI

```bash
npm install -g firebase-tools
```

### Login

```bash
firebase login
```

### Initialize Firebase Hosting

```bash
firebase init hosting
```

เลือก:
- **Existing project** → เลือกโปรเจกต์ของคุณ
- **Public directory**: `dist`
- **Single-page app**: `Yes`
- **GitHub deploys**: `No` (หรือ Yes ถ้าต้องการ)

### Build และ Deploy

```bash
npm run build
firebase deploy
```

แอปจะถูก deploy ที่ `https://your-project-id.web.app`

---

## 🔒 Security Best Practices

### 1. ปกป้อง API Key
- ไม่ต้องกังวลกับ API Key ที่โชว์ในโค้ด
- Firebase API Key ปลอดภัยแม้เปิดเผยสาธารณะ
- ความปลอดภัยจริงๆ อยู่ที่ **Firestore Rules**

### 2. Firestore Rules ที่แนะนำ
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /expenses/{expenseId} {
      // ต้อง login ก่อน
      allow read, write: if request.auth != null 
        // และต้องเป็นเจ้าของข้อมูล
        && request.auth.uid == resource.data.userId;
      
      allow create: if request.auth != null 
        && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

### 3. Email Verification (ถ้าต้องการ)
เพิ่มในไฟล์ `src/firebase/auth.js`:

```javascript
import { sendEmailVerification } from 'firebase/auth';

export const sendVerificationEmail = async () => {
  const user = auth.currentUser;
  if (user) {
    await sendEmailVerification(user);
  }
};
```

---

## 📊 Firestore Data Structure

```
expenses (collection)
├── {expenseId} (document)
    ├── amount: 150.50
    ├── category: "อาหาร"
    ├── description: "ข้าวเที่ยง"
    ├── date: "2024-01-15"
    ├── userId: "abc123..."
    ├── createdAt: Timestamp
    └── updatedAt: Timestamp
```

---

## 💡 Tips & Troubleshooting

### ปัญหา: Authentication error
**แก้ไข**: ตรวจสอบว่าเปิดใช้ Email/Password ใน Authentication แล้ว

### ปัญหา: Permission denied (Firestore)
**แก้ไข**: ตรวจสอบ Firestore Rules ให้ตรงกับด้านบน

### ปัญหา: Environment variables ไม่ทำงาน
**แก้ไข**: 
- ตรวจสอบว่ามีไฟล์ `.env` ในโฟลเดอร์หลัก
- ตั้งชื่อ variable ต้องขึ้นต้นด้วย `VITE_`
- Restart dev server หลังแก้ไข .env

### ปัญหา: Cannot read properties of undefined
**แก้ไข**: ตรวจสอบว่าใส่ค่าใน `.env` ครบทุก field

---

## 📈 ฟีเจอร์ที่ได้จาก Firebase

✅ **Authentication**
- Login/Register ด้วย Email/Password
- Session management อัตโนมัติ
- ปลอดภัยด้วย Firebase Security

✅ **Firestore Database**
- NoSQL Database แบบ real-time
- Sync ข้อมูลอัตโนมัติ
- ใช้งานได้หลายเครื่อง

✅ **Real-time Updates**
- แก้ไขที่เครื่องหนึ่ง อัปเดตทุกเครื่องทันที
- ไม่ต้อง refresh หน้าเว็บ

✅ **Scalability**
- รองรับผู้ใช้ได้ไม่จำกัด
- Auto-scaling

---

## 💰 ราคา (Free Tier)

Firebase มี Free Tier ที่เพียงพอสำหรับแอปขนาดเล็ก-กลาง:

- **Authentication**: 10,000 verifications/เดือน (ฟรี)
- **Firestore**: 
  - 50,000 reads/วัน
  - 20,000 writes/วัน
  - 1 GB storage
  - ฟรี!
- **Hosting**: 10 GB storage + 360 MB/วัน (ฟรี)

เพียงพอสำหรับผู้ใช้หลายร้อย-พันคน! 🎉

---

**Happy Coding with Firebase! 🔥**
