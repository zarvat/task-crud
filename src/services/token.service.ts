interface UserTokens {
  accessToken: string;
  refreshToken: string;
}

class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem('tz_user') || 'null');
    return user?.refreshToken;
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem('tz_user') || 'null');
    return user?.accessToken;
  }

  updateLocalAccessToken(token: string) {
    const user = JSON.parse(localStorage.getItem('tz_user') || 'null');
    user.accessToken = token;
    localStorage.setItem('tz_user', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('tz_user') || 'null');
  }

  setUser(userTokens: UserTokens) {
    localStorage.setItem('tz_user', JSON.stringify(userTokens));
  }

  removeUser() {
    localStorage.removeItem('tz_user');
  }
}

export default new TokenService();
