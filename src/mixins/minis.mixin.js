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
    themeMain: {
      deep: true,
      handler(themeMain) {
        if(!themeMain) return this.switchTheme('main');
        Object.entries(themeMain.colors).forEach(([key, color]) => {
          document.body.style.setProperty(`--${ key }`, color);
        });
      },
    },
    themeSpecial: {
      deep: true,
      handler(themeSpecial) {
        if(!themeSpecial) return this.switchTheme('special');
        document.body.style.setProperty(`--special-color`, themeSpecial.normal);
      }
    },
  },

  computed: {
    ...mapGetters([
        'translate', 
        'translateList', 
        'themeMain',
        'themeSpecialName',
        'themeSpecial'
    ]),
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

    getMinisOptions() {
      const linkToMinis = 'https://adequm.github.io/minis';
      return new Promise(async resolve => {
        try {
          const translate = await fetch(`${ linkToMinis }/translate.json`).then(d => d.json());
          const minisList = await fetch(`${ linkToMinis }/minisList.json`).then(d => d.json());
          const themesList = await fetch(`${ linkToMinis }/themesList.json`).then(d => d.json());
          Object.entries(themesList.default || []).forEach(([key, color]) => {
            document.body.style.setProperty(`--${ key }`, color);
          });
          resolve({ translate, minisList, themesList });
        } catch(err) {
          setTimeout(async () => {
            const minisOptions = await this.getMinisOptions();
            resolve(minisOptions);
          }, 2000);
        }
      });
    },
  },

  async created() {
    const minisOptions = await this.getMinisOptions();
    this.initMinis(minisOptions);
    this.isPageLoad = true;
  },
};