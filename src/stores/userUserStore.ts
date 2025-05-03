import { defineStore } from 'pinia';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserStore {
  user: User | null;
  token: string | null;
}

export const UseUserStore = defineStore('useUserStore', {
  state: () => ({
    user: null,
    token: null,
  }),
  getters: {
    isAuthenticated: (state): boolean => !!state.token,
    getUser: (state): User | null => state.user,
  },
  actions: {
    setUser(user: User | null): void {
      this.user = user;
    },
    setToken(token: string | null): void {
      this.token = token;
    },
    clearUser() {
      this.user = null;
      this.token = null;
    },
  },
});
