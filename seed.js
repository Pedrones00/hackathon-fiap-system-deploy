const QUANTITY = 20;

const seed = async () => {
  const agency = "0001";
  const account = "123456";

  const budgetItems = [
    { category: "FOOD", amount: 1000.00 },
    { category: "TRANSPORT", amount: 500.00 },
    { category: "SERVICES", amount: 300.00 }
  ];

  const rulePatterns = [
    { pattern: "IFOOD", category: "FOOD" },
    { pattern: "UBER", category: "TRANSPORT" },
    { pattern: "NETFLIX", category: "SERVICES" },
    { pattern: "AMAZON", category: "SERVICES" }
  ];

  for (const b of budgetItems) {
    try {
      const res = await fetch("http://localhost:3003/budgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agency: agency,
          account: account,
          category_name: b.category,
          budget_amount: b.amount
        })
      });
      console.log(`[Budget] ${b.category}: ${res.status}`);
    } catch (err) {
      console.error(`[Budget Error] ${b.category}: ${err.message}`);
    }
  }

  for (const r of rulePatterns) {
    try {
      const res = await fetch("http://localhost:3002/rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agency: agency,
          account: account,
          entry_name_pattern: r.pattern,
          category: r.category
        })
      });
      console.log(`[Rule] ${r.pattern}: ${res.status}`);
    } catch (err) {
      console.error(`[Rule Error] ${r.pattern}: ${err.message}`);
    }
  }

  const debitNames = ["IFOOD", "UBER", "NETFLIX", "AMAZON", "GAS STATION", "PHARMACY", "BAKERY"];

  for (let i = 1; i <= QUANTITY; i++) {
    const selectedName = debitNames[Math.floor(Math.random() * debitNames.length)];
    const payload = {
      cpf: "12345678901",
      agency: agency,
      account: account,
      entry_name: `${selectedName}`.substring(0, 20),
      value: parseFloat((Math.random() * 200 + 10).toFixed(2)),
      entry_type: "DEBIT"
    };

    try {
      const res = await fetch("http://localhost:3001/account-entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (i % 20 === 0) console.log(`[Entries] Processed ${i}/${QUANTITY}`);
    } catch (err) {
      console.error(`[Entry Error]: ${err.message}`);
    }
  }

  try {
    const res = await fetch("http://localhost:3003/budget/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agency, account })
    });
    console.log(`[Refresh] Status: ${res.status}`);
  } catch (err) {
    console.error(`[Refresh Error]: ${err.message}`);
  }

  console.log("Seed process completed");
};

seed().catch(err => {
  console.error("Critical Failure:", err);
  process.exit(1);
});