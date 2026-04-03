const TOKEN_KEY = "workflow_token";
const USER_KEY = "workflow_user";

export interface User {
  id: string;
  email: string;
  username: string;
  avatar: string;
}

export const auth = {
  login(email: string, password: string, username: string) {
    // fake validation
    if (email && password && username) {
      const user: User = {
        id: Date.now().toString(),
        email,
        username,
        avatar: username.charAt(0).toUpperCase(),
      };
      localStorage.setItem(TOKEN_KEY, "fake-jwt-token");
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  isAuthenticated() {
    return localStorage.getItem(TOKEN_KEY) !== null;
  },

  getCurrentUser(): User | null {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  },
};
