import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  getDocs,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";

const EXPENSES_COLLECTION = "expenses";

export const addExpense = async (userId, expenseData) => {
  try {
    const docRef = await addDoc(collection(db, EXPENSES_COLLECTION), {
      ...expenseData,
      userId: userId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return {
      success: true,
      id: docRef.id,
    };
  } catch (error) {
    console.error("Error adding expense:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const updateExpense = async (expenseId, expenseData) => {
  try {
    const expenseRef = doc(db, EXPENSES_COLLECTION, expenseId);
    await updateDoc(expenseRef, {
      ...expenseData,
      updatedAt: Timestamp.now(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating expense:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const deleteExpense = async (expenseId) => {
  try {
    await deleteDoc(doc(db, EXPENSES_COLLECTION, expenseId));
    return { success: true };
  } catch (error) {
    console.error("Error deleting expense:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const getUserExpenses = async (userId) => {
  try {
    const q = query(
      collection(db, EXPENSES_COLLECTION),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
    );

    const querySnapshot = await getDocs(q);
    const expenses = [];

    querySnapshot.forEach((doc) => {
      expenses.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return {
      success: true,
      expenses: expenses,
    };
  } catch (error) {
    console.error("Error getting expenses:", error);
    return {
      success: false,
      error: error.message,
      expenses: [],
    };
  }
};

export const subscribeToExpenses = (userId, callback) => {
  const q = query(
    collection(db, EXPENSES_COLLECTION),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(
    q,
    (querySnapshot) => {
      const expenses = [];
      querySnapshot.forEach((doc) => {
        expenses.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      callback(expenses);
    },
    (error) => {
      console.error("Error listening to expenses:", error);
      callback([]);
    },
  );
};
