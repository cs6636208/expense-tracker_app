export const filterByPeriod = (expenses, period) => {
  if (period === "all") return expenses;

  const now = new Date();
  return expenses.filter((exp) => {
    const expDate = new Date(exp.date);
    const diffTime = now - expDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    switch (period) {
      case "today":
        return diffDays < 1;
      case "week":
        return diffDays < 7;
      case "month":
        return diffDays < 30;
      case "year":
        return diffDays < 365;
      default:
        return true;
    }
  });
};

export const filterByCategory = (expenses, category) => {
  if (category === "all") return expenses;
  return expenses.filter((exp) => exp.category === category);
};

export const sortExpenses = (expenses, sortBy) => {
  const sorted = [...expenses];

  switch (sortBy) {
    case "date-desc":
      return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    case "date-asc":
      return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    case "amount-desc":
      return sorted.sort((a, b) => b.amount - a.amount);
    case "amount-asc":
      return sorted.sort((a, b) => a.amount - b.amount);
    default:
      return sorted;
  }
};

export const calculateCategoryTotals = (expenses, categories) => {
  const categoryTotals = {};

  expenses.forEach((exp) => {
    categoryTotals[exp.category] =
      (categoryTotals[exp.category] || 0) + exp.amount;
  });

  return Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
    color: categories.find((c) => c.name === name)?.color || "#999",
  }));
};

export const calculateMonthlyTotals = (expenses) => {
  const monthlyTotals = {};

  expenses.forEach((exp) => {
    if (!exp.date) return;

    const date =
      typeof exp.date === "string" ? new Date(exp.date) : exp.date?.toDate?.();

    if (!date || isNaN(date)) return;

    const month = date.toISOString().substring(0, 7);
    monthlyTotals[month] = (monthlyTotals[month] || 0) + exp.amount;
  });

  return Object.entries(monthlyTotals)
    .map(([month, amount]) => ({ month, amount }))
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-6);
};

export const formatCurrency = (amount) => {
  return amount.toLocaleString("th-TH", { minimumFractionDigits: 2 });
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};
