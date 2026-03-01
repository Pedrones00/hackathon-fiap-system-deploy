const QUANTITY = 100;

const seed = async () => {
  const rules = [
    { agency: "0001", account: "123456", entry_name_pattern: "IFOOD", category: "FOOD" },
    { agency: "0001", account: "123456", entry_name_pattern: "UBER", category: "TRANSPORT" },
    { agency: "0001", account: "123456", entry_name_pattern: "SALARY", category: "INCOME" }
  ];

  console.log("Setting up rules...");
  for (const rule of rules) {
    try {
      await fetch("http://localhost:3002/rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rule)
      });
    } catch (err) {
      console.error("Error setting rules");
    }
  }

  const debitNames = ["IFOOD", "UBER", "NETFLIX", "AMAZON", "GAS STATION", "PHARMACY", "BAKERY"];
  const creditNames = ["SALARY", "PIX RECEIVED", "REFUND"];

  console.log("Generating entries...");
  for (let i = 1; i <= QUANTITY; i++) {
    const isCredit = i % 5 === 0;
    const list = isCredit ? creditNames : debitNames;
    const selectedName = list[Math.floor(Math.random() * list.length)];

    const payload = {
      cpf: "12345678901",
      agency: "0001",
      account: "123456",
      entry_name: `${selectedName}`.substring(0, 20),
      value: isCredit ? 2500.00 : parseFloat((Math.random() * 200 + 10).toFixed(2)),
      entry_type: isCredit ? "CREDIT" : "DEBIT"
    };

    try {
      const res = await fetch("http://localhost:3001/account-entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      console.log(`[${payload.entry_type}] ${payload.entry_name} - Status: ${res.status}`);
    } catch (err) {
      console.error("Connection error");
    }
  }
  console.log("Finish");
};

seed();