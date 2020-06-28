import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balanceInitial = { income: 0, outcome: 0, total: 0 };

    let balance = this.transactions.reduce((r, a) => {
      r[a.type] = r[a.type] + a.value;
      a.type === 'income' ? (r['total'] += a.value) : (r['total'] -= a.value);
      return r;
    }, balanceInitial);

    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
