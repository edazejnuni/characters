class AuthService {
  static mockUser = {
    id: 1,
    username: 'admin',
  };

  static login(username, password) {
    if (username === 'admin' && password === 'password') {
      const token = 'mocked-jwt-token';
      localStorage.setItem('token', token);
      return true;
    }
    return false;
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static logout() {
    localStorage.removeItem('token');
  }
}

export default AuthService;
