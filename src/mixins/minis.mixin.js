import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
  name: 'App',

  data: () => ({
    isPageLoad: false,
  }),

  watch: {
    translateList: {
      deep: true,
      immediate: true,
      handler(translateList) {
        if(!Object.values(translateList).length) return;
        document.title = this.translate('title');
      }
    },
    themeData: {
      deep: true,
      handler(themeData) {
        if(!themeData) return this.switchTheme();
        Object.entries(themeData.properties).forEach(([key, color]) => {
          document.body.style.setProperty(`--${ key }`, color);
        });
      },
    },
  },

  computed: {
    ...mapGetters(['translate', 'translateList', 'themeData']),
    ...mapState({ 
      minisTheme: state => state.minis.minisTheme,
      minisLang: state => state.minis.minisLang,
    }),
  },

  methods: {
    ...mapMutations({ 
      switchTheme: (commit, args) => commit('switchTheme', args),
      switchLang: (commit, args) => commit('switchLang', args),
      initMinis: (commit, args) => commit('initMinis', args),
    }),
  },

  async beforeCreate() {
    try {
      const linkToMinis = 'https://adequm.github.io/minis';
      const translate = await fetch(`${ linkToMinis }/translate.json`).then(d => d.json());
      const minisList = await fetch(`${ linkToMinis }/minisList.json`).then(d => d.json());
      const themesList = await fetch(`${ linkToMinis }/themesList.json`).then(d => d.json());
      this.initMinis({ translate, minisList, themesList });
    } catch(err) {}
    this.isPageLoad = true;
  },
};