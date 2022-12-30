interface EnumCurrency {
  USD: 'cent';
  RUB: 'kopeika';
  EUR: 'eurocent';
}

interface AccountInfo {
  uuid: string;
  accountName: string;
  bankName: string;
  fio: string;
  bik: string;
  corrAccount: string;
  currency: EnumCurrency;
  amount: number;
}

interface ErrorLine {
  field: string;
  message: string;
}

class CustomError extends Error {
  constructor(message: string, type: string, errors: ErrorLine[]) {
    super(message);
    this.errors = errors;
    this.type = type;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  public errors: ErrorLine[];
  public type: string;
}

export class BankAPIHandler {
  private authenticated: boolean;
  private accounts: AccountInfo[];

  constructor() {
    this.authenticated = false;
    this.accounts = [];
  }

  async login(username: string, password: string): Promise<string> {
    try {
      // some Auth code
    } catch (e) {
      if (e instanceof CustomError) {
        if (e.type === 'AuthorizationError') {
          const errorMessages: string[] = [];
          for (const errorLine of e.errors) {
            errorMessages.push(
              errorLine.field === 'username' ? 'Неверный логин' : 'Неверный пароль'
            );
          }
          throw `Ошибка авторизации: ${errorMessages.join(', ')}`;
        }
        throw new Error(e.message);
      }
      //some errors handling
    }

    this.authenticated = true;
    return 'token';
  }

  async fetchAccountInfos() {
    // some fetching code
  }

  async pay(accountId: string, sum: number) {
    if (!this.accounts.length) {
      await this.fetchAccountInfos();
    }

    const account = this.accounts.find((item) => item.uuid === accountId);

    if (!account) {
      throw new Error(`Аккаунт ${accountId} не найден в списке`);
    }

    if (account.amount < sum) {
      throw new Error(
        `Не хватает денег на счёте ${account.accountName}. Необходимо пополнить счёт на ${
          sum - account.amount
        } ${account.currency}`
      );
    }
    const transactionResult = await ((accountId, sum) =>
      /*some transaction code*/
      new Promise(() => true))().catch((e) => {
      throw new Error(e.message);
    });
    if (transactionResult) {
      account.amount -= sum;
    }
  }
}
