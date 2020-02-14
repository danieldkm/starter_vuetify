import Vue from "vue";
import Vuex from "vuex";
import axios from "../axios-auth"
import router from "../router";
import VuexPersist from 'vuex-persist';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
    // key: 'vuex', // The key to store the state on in the storage provider.
    storage: window.localStorage, // or window.sessionStorage or localForage
    // Function that passes the state and returns the state with only the objects you want to store.
    // reducer: state => state,
    // Function that passes a mutation and lets you decide if it should update the state in localStorage.
    // filter: mutation => (true)
  })

export default new Vuex.Store({
    state: {
        idToken: null,
        conta: null,
        isAuthenticated: null,
        error: {},
        message: {
            message: null,
            error: false
        },
        alert: false,
        loading: false
    },
    getters: {
        idToken: state => state.idToken,
        conta: state => state.conta,
        isAuthenticated: state => state.isAuthenticated,
        error: state => state.error,
        message: state => state.message,
        alert: state => state.alert,
        loading: state => state.loading
    },
    mutations: {
        updateIdToken(state, idToken) {
            state.idToken = idToken;
        },
        updateConta(state, conta) {
            state.conta = conta;
        },
        updateIsAuthenticated(state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated;
        },
        updateError(state, error) {
            state.error = error;
        },
        updateAlert(state, alert) {
            state.alert = alert;
        },
        updateLoading(state, loading) {
            state.loading = loading;
        },
        updateMessage(state, message) {
            state.message = message;
        },
    },
    actions: {
        updateMessage({ commit }, message) {
            commit('updateMessage', message);
        },
        callLoading({ commit }) {
            commit('updateLoading', true);
        },
        reset({ commit }) {
            commit('updateLoading', false);
            commit('updateAlert', false);
            commit('updateError', {});
            commit('updateMessage', {
                message: null,
                error: false
            });
        },
        login({ commit }, authData) {
            axios
                .post(
                    "/users/signin",
                    {
                        user: authData.email,
                        pwd: authData.password,
                        token: authData.tokenRecaptcha
                    }
                )
                .then(response => {
                    commit('updateIdToken', response.data.token);
                    commit('updateConta', response.data.usuario);
                    commit('updateError', {message: ""});
                    commit('updateAlert', false);
                    commit('updateLoading', false);
                    router.push('/home');
                })
                .catch(error => {
                    commit('updateIdToken', null);
                    commit('updateError', {message: "usuário/senha inválido!"});
                    commit('updateAlert', true);
                    commit('updateLoading', false);
                    // eslint-disable-next-line no-console
                    console.error('error', error);
                });
        },
        logout({ commit }) {
            commit('updateIdToken', null);
            commit('updateIsAuthenticated', false);
            router.push('/');
        },
        register({ commit }, authData) {
            axios
                .post(
                    "/users/signup",
                    {
                        nome: authData.email,
                        senha: authData.password,
                        email: authData.email
                    }
                )
                .then(response => {
                    commit('updateIdToken', response.data.idToken);
                    router.push('/');
                })
                .catch(error => {
                    // eslint-disable-next-line no-console
                    console.error('error', error);
                });
        },
        updateUsuario({ commit }, usuario) {
            axios
                .put("/users",
                    usuario,
                    {headers: {'token': this.getters.idToken }}
                )
                .then(response => {
                    commit('updateIdToken', response.data.token);
                    commit('updateConta', response.data.usuario);
                    commit('updateMessage', {error: false, message:response.data.message?response.data.message:'Usuário atualizado com sucesso!'});
                    commit('updateLoading', false);
                })
                .catch(error => {
                    commit('updateMessage', {error: false, message: error.response.data.message?error.response.data.message:'erro ao tentar atualizar usuario'});
                    commit('updateLoading', false);
                    // eslint-disable-next-line no-console
                    console.error('error.updateUsuario', error);
                });
        },
        updateUsuarioAndChangePassword({ commit }, usuario) {
            axios
                .put("/users",
                    {nome:usuario.nome,email:usuario.email},
                    {headers: {'token': this.getters.idToken }}
                ).then(response => {
                    if(response.data.message === 'usuário atualizado') {
                        return axios.put("/users/change",
                        {novaSenha:usuario.novaSenha,senha:usuario.senha},
                            {headers: {'token': this.getters.idToken }}
                        )
                    } else {
                        return Promise.reject('erro')
                    }
                }).then(response => {
                    commit('updateIdToken', response.data.token);
                    commit('updateConta', response.data.usuario);
                    commit('updateMessage', {error: false, message:response.data.message?response.data.message:'Usuário atualizado com sucesso!'});
                    commit('updateLoading', false);
                }).catch(error => {
                    commit('updateMessage', {error: false, message: error.response.data.message?error.response.data.message:'erro ao tentar atualizar usuario'});
                    commit('updateLoading', false);
                    // eslint-disable-next-line no-console
                    console.error('error.updateUsuario', error);
                });
        }
    },
    plugins: [vuexLocalStorage.plugin]
})