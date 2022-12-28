class BankAPI {
  async login(username, password): Promise<string> {
    // try {
    //   //doSomething
    // } catch (e) {
    //   if (e instanceof userNotFoundError) {
    //     throw new Error(`Неправильный логин`);
    //   }
    //
    //   if (e instanceof incorrectPasswordError) {
    //     throw new Error(`Неправильный пароль`);
    //   }
    // }
    return 'token';
  }

  async getAccountInfos() {
    //doSomething
    return [];
  }

  async fetchTransactions(account: string, sum: number) {
    //doSomething
    return {
      result: true,
    };
  }
}

export const api = new BankAPI();
