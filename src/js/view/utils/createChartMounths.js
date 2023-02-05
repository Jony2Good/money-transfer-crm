function getStringMonths(numberMonths) {
  const months = [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
  ];
  return numberMonths.map((num) => months[num]);
}

export default function getMonthsBalances(
  transactions,
  account,
  balance,
  countOfMonths
) {
  const balances = [balance];
  const months = [];
  const incomingTransfers = [];
  const outingTransfers = [];
  const currentMonth = new Date().getMonth();
  let month = currentMonth;

  for (let i = 0; i < countOfMonths; i++) {
    incomingTransfers[i] = 0;
    outingTransfers[i] = 0;
  }

  while (countOfMonths > months.length) {
    months.push(month);

    if (month == 0) month = 11;
    else month--;
  }

  let prevMonth = currentMonth;
  let numberOfMonth = 0;

  for (let i = transactions.length - 1; i >= 0; i--) {
    const transaction = transactions[i];

    while (new Date(transaction.date).getMonth() !== prevMonth) {
      if (prevMonth == 0) prevMonth = 11;
      else prevMonth--;
      balances.push(balance);

      const allTransfers =
        incomingTransfers[numberOfMonth] + outingTransfers[numberOfMonth];

      if (allTransfers > 0) {
        if (incomingTransfers[numberOfMonth] > 0)
          incomingTransfers[numberOfMonth] =
            outingTransfers[numberOfMonth] > 0
              ? balances[numberOfMonth] *
                (incomingTransfers[numberOfMonth] / allTransfers)
              : balances[numberOfMonth];
        if (outingTransfers[numberOfMonth] > 0)
          outingTransfers[numberOfMonth] =
            incomingTransfers[numberOfMonth] > 0
              ? balances[numberOfMonth] *
                (outingTransfers[numberOfMonth] / allTransfers)
              : balances[numberOfMonth];
      }

      numberOfMonth++;

      if (balances.length >= countOfMonths) break;
    }

    if (transaction.to === account) {
      balance -= transaction.amount;
      incomingTransfers[numberOfMonth] += transaction.amount;
    } else {
      balance += transaction.amount;
      outingTransfers[numberOfMonth] += transaction.amount;
    }

    if (balance < 0) balance = 0;
    if (balances.length >= countOfMonths) break;
  }

  while (balances.length < countOfMonths) balances.push(0);

  for (let i = 0; i < countOfMonths; i++) {
    const incoming = incomingTransfers[i];
    const outing = outingTransfers[i];
    const allTransfers = incoming + outing;
    if (allTransfers > 0) {
      if (incoming > 0)
        incomingTransfers[i] =
          outing > 0 ? balances[i] * (incoming / allTransfers) : balances[i];
      if (outing > 0)
        outingTransfers[i] =
          incoming > 0 ? balances[i] * (outing / allTransfers) : balances[i];
    }
  }

  return [
    getStringMonths(months.reverse()),
    balances.reverse(),
    incomingTransfers.reverse(),
    outingTransfers.reverse(),
  ];
}
