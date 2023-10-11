class AuthService {
  static mockUser = {
    id: 1,
    username: 'admin',
  };

  static login(username, password) {
    if (username === 'admin' && password === 'password') {
      const token = 'mocked-jwt-token';
      localStorage.setItem('token', token);
      localStorage.setItem('tokenExpiry', Date.now() + 6000); 
      return true;
    }
    return false;
  }

  static getToken() {
    const token = localStorage.getItem('token');
    const tokenExpiry = parseInt(localStorage.getItem('tokenExpiry'));

    if (!token || !tokenExpiry) {
      return null;
    }

    if (tokenExpiry < Date.now()) {
      this.refreshToken();
    }

    return token;
  }

  static refreshToken() {
    const newToken = 'new-mocked-jwt-token';
    localStorage.setItem('token', newToken);
  }

  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
  }
}

export default AuthService;
