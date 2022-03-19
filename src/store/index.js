import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import createMutationsSharer from 'vuex-shared-mutations';

const projectKey = location.pathname.split('/')[1].split('-').slice(1).join('-');
const switchFullscreenKey = `switchFullscreen_${projectKey}`;
import { vuexMinisModule as minisModule, persistedMinis } from '@minis-core/mixins';

const store = {};
Vue.use(Vuex);

store.state = () => ({
  isFullscreen: false,
  switchFullscreenKey,
  projectKey,
  history: [],
});


store.mutations = {
  [switchFullscreenKey]: state => Vue.set(state, 'isFullscreen', !state.isFullscreen),
  addToCalculatorHistory(state, data) {
    const newHistory = state.history.slice(-9).concat([data]);
    Vue.set(state, 'history', newHistory);
  },
  clearHistory(state) {
    Vue.set(state, 'history', []);
  },
};


const persistedLocal = [
  'history',
];
store.modules = { minis: minisModule };
store.plugins = [
  createMutationsSharer({ predicate: () => [...persistedMinis, ...persistedLocal] }),
  createPersistedState({ paths: persistedMinis, key: 'minis' }),
  createPersistedState({ paths: persistedLocal.concat('isFullscreen'), key: `minis-${projectKey}` }),
];

export default new Vuex.Store(store);