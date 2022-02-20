import Vue from 'vue';
const store = {};

store.state = () => ({
  minisLang: 'ru',
  minisTheme: 'dark',
  themesList: {},
  translate: {},
  minisList: {},
});

store.getters = {
  translateList({ translate, minisLang }) {
    return translate?.[minisLang]?.calculator || {};
  },
  translate({}, { translateList }) {
    return path => translateList?.[path] || 'Err';
  },
  themeData({ themesList, minisTheme }) {
    return themesList[minisTheme];
  },
};

store.mutations = {
  switchTheme(state) {
    const themesList = Object.keys(state.themesList);
    const themeIndex = themesList.indexOf(state.minisTheme);
    const newThemeIndex = (themeIndex + 1) % themesList.length;
    Vue.set(state, 'minisTheme', themesList[newThemeIndex]);
  },
  switchLang(state) {
    const langsList = Object.keys(state.translate);
    const langIndex = langsList.indexOf(state.minisLang);
    const newLangIndex = (langIndex + 1) % langsList.length;
    Vue.set(state, 'minisLang', langsList[newLangIndex]);
  },
  initMinis(state, { translate, minisList, themesList }) {
    Vue.set(state, 'minisList', minisList);
    Vue.set(state, 'translate', translate);
    Vue.set(state, 'themesList', themesList);
  },
};

export default store;