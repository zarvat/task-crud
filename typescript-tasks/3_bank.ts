import { api } from './bankAPI';

interface EnumCurrency {
  USD: 'cent';
  RUB: 'kopeika';
  EUR: 'eurocent';
}

interface accountInfo {
  uuid: string;
  accountName: string;
  bankName: string;
  fio: string;
  bik: string;
  corrAccount: string;
  currency: EnumCurrency;
  amount: number;
}

class BankAPIHandler {
  private authenticated: boolean;
  private accounts: accountInfo[];

  async login(username, password): Promise<string> {
    const token = await api.login(username, password).catch((e) => {
      throw new Error(e);
    });
    this.authenticated = true;
    return token;
  }

  async fetchAccountInfos() {
    const accountInfos = await api.getAccountInfos().catch((e) => {
      throw new Error(e);
    });
    this.accounts = accountInfos;
  }

  async pay(accountId: string, sum: number) {
    const account = this.accounts.find((item) => item.uuid === accountId);
    if (account.amount < sum) {
      throw new Error(
        `Не хватает денег на счёте ${account.accountName}. Необходимо пополнить счёт на ${
          sum - account.amount
        } ${account.currency}`
      );
    }
    const transaction = await api.fetchTransactions(accountId, sum).catch((e) => {
      throw new Error(e);
    });
    if (transaction.result) {
      account.amount -= sum;
    }
  }
}
