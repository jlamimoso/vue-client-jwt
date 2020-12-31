import axios from 'axios';

const state = {
    user: null,
    books: [],
    rft: null
};

const getters = {
    StateBooks: state => state.books,
    StateUser: state => state.user,
    StateRft: state => state.rft
};

const actions = {
    async books({ commit }) {
        commit('setBooks', []);
        let resp = await axios.get('books');
        commit('setBooks', resp.data);
    },

    async LogIn({ commit }, form) {
        var json = JSON.stringify(form);
        commit('setUser', null);
        var resp = await axios.post('login', json);
        if (resp.data.erro) {
            return resp.data.erro;
        }
        commit('setUser', form.username);
        commit('setToken', resp.data.refreshToken);
        return null;
    },

    async LogOut({ commit }) {
        commit('logout');
    }
};

const mutations = {
    setUser(state, username) {
        state.user = username;
    },

    setToken(state, token) {
        state.rft = token;
    },

    setBooks(state, books) {
        state.books = books;
    },
    logout(state) {
        state.user = null;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
