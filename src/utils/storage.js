const STORAGE_KEY = "expenses";

export const loadExpenses = () => {
  try {
    const savedExpenses = localStorage.getItem(STORAGE_KEY);
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  } catch (error) {
    console.error("Error loading expenses:", error);
    return [];
  }
};

export const saveExpenses = (expenses) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    return true;
  } catch (error) {
    console.error("Error saving expenses:", error);
    return false;
  }
};

export const clearExpenses = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error("Error clearing expenses:", error);
    return false;
  }
};
