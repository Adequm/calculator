import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import createMutationsSharer from 'vuex-shared-mutations';

const projectKey = location.pathname.split('/')[1].split('-').slice(1).join('-');
const fullscreenKey = `${ projectKey }-isFullscreen`;
import { vuexMinisModule as minisModule, persistedMinis } from '@minis-core/mixins';

const store = {};
Vue.use(Vuex);

store.state = () => ({
  [fullscreenKey]: false,
  switchFullscreenKey: `switch_${fullscreenKey}`,
  projectKey,
  history: [],
});


store.getters = {
  isFullscreen: state => state[fullscreenKey],
};


store.mutations = {
  [`switch_${fullscreenKey}`]: state => Vue.set(state, fullscreenKey, !state[fullscreenKey]),
  addToHistory(state, data) {
    const newHistory = state.history.slice(-9).concat([data]);
    Vue.set(state, 'history', newHistory);
  },
  clearHistory(state) {
    Vue.set(state, 'history', []);
  },
};


const persistedLocal = [
  fullscreenKey,
  'history',
];
store.modules = { minis: minisModule };
store.plugins = [
  createMutationsSharer({ predicate: () => [...persistedMinis, ...persistedLocal] }),
  createPersistedState({ paths: persistedMinis, key: 'minis' }),
  createPersistedState({ paths: persistedLocal, key: `minis-${projectKey}` }),
];

export default new Vuex.Store(store);