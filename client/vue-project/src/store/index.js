import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
      userid: localStorage.getItem('userid') || null, 
    };
  },
  mutations: {
    login(state, userid) {
      state.userid = userid;
      state.isAuthenticated = true;
      localStorage.setItem('userid', userid);
      localStorage.setItem('isAuthenticated', 'true');
    },
    logout(state) {
      state.isAuthenticated = false;
      localStorage.setItem('isAuthenticated', 'false');
    },
  },
  actions: {
    login({ commit }, userid) {
      commit('login', userid);
    },
    logout({ commit }) {
      commit('logout');
    },
  },
});

export default store;
