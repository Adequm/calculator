import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import createMutationsSharer from 'vuex-shared-mutations';

import minisModule from './minis';

const store = {};
Vue.use(Vuex);

store.state = () => ({
  history: [],
});


store.mutations = {
  addToHistory(state, data) {
    const newHistory = state.history.slice(-9).concat([data]);
    Vue.set(state, 'history', newHistory);
  },
  clearHistory(state) {
    Vue.set(state, 'history', []);
  },
};



const persistedMinis = ['minis.minisThemeMain', 'minis.minisThemeSpecial', 'minis.minisLang'];
const persistedLocal = ['history'];
const projectKey = `minis-${ location.pathname.split('/')[1] }`;
store.modules = { minis: minisModule };
store.plugins = [
  createMutationsSharer({ predicate: () => [...persistedMinis, ...persistedLocal] }),
  createPersistedState({ paths: persistedMinis, key: 'minis' }),
  createPersistedState({ paths: persistedLocal, key: projectKey }),
];

export default new Vuex.Store(store);