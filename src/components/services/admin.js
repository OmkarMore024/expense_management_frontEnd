const admin = {
  expensesType: [
    {
      id: 1,
      name: "EMI",
    },
    {
      id: 2,
      name: "Light bill",
    },
    {
      id: 3,
      name: "Car Loan",
    },
    {
      id: 4,
      name: "rent",
    },
  ],
  users: [
    {
      id: 1,
      name: "prashant sable",
    },
    {
      id: 2,
      name: "dinkar",
    },
    {
      id: 3,
      name: "Venky",
    },
  ],
};

export function getExpenseType() {
  return admin.expensesType;
}
export function getUsers() {
  return admin.users;
}
