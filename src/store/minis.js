import Vue from 'vue';
const store = {};

store.state = () => ({
  minisLang: 'ru',
  minisThemeMain: null,
  minisThemeSpecial: null,
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
  themeMain({ themesList, minisThemeMain }) {
    const isExist = themesList?.main?.[minisThemeMain];
    return isExist ? themesList.main[minisThemeMain] : themesList?.main?.dark;
  },
  themeSpecialName({ themesList, minisThemeSpecial }) {
    const isExist = themesList?.special?.colors?.[minisThemeSpecial];
    return isExist ? minisThemeSpecial : themesList?.special?.default;
  },
  themeSpecial({ themesList }, { themeSpecialName }) {
    return themesList?.special?.colors?.[themeSpecialName];
  },
};

store.mutations = {
  switchTheme(state, type = 'main') {
    const stateKey = type == 'main' ? 'minisThemeMain' : 'minisThemeSpecial';
    const themes = type == 'main' ? state.themesList.main : state.themesList.special.colors;
    const themesList = Object.keys(themes);
    const themeIndex = themesList.indexOf(state[stateKey]);
    const newThemeIndex = (themeIndex + 1) % themesList.length;
    Vue.set(state, stateKey, themesList[newThemeIndex]);
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