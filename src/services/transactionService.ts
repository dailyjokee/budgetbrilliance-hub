
export interface Transaction {
  id: string;
  type: "income" | "expense";
  name: string;
  category: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
  paymentMethod?: string;
  reference?: string;
  description?: string; // Added missing description property
}

export const filterTransactions = (
  transactions: Transaction[],
  filter: { type: "income" | "expense" | "all"; search: string; status: "completed" | "pending" | "failed" | "all" }
): Transaction[] => {
  return transactions.filter((transaction) => {
    // Filter by type
    if (filter.type !== "all" && transaction.type !== filter.type) {
      return false;
    }

    // Filter by status
    if (filter.status !== "all" && transaction.status !== filter.status) {
      return false;
    }

    // Filter by search term
    if (filter.search && !transaction.name.toLowerCase().includes(filter.search.toLowerCase())) {
      return false;
    }

    return true;
  });
};
