<template>
  <div 
    class="container" 
    :style="{ 
      height: `${ innerHeight }px`, 
      maxWidth: innerWidth < 768 ? '100vw' : `${ maxWidth }px`
    }"
  >
    <Icon 
      v-if="!isPageLoad"
      type="loader"
      class="loader"
      rotate
    />
    <Calculator
      v-else
      ref="calculator"
      :history="history"
      :themeIcon="themeMain.icon"
      :minisLang="minisLang"
      :maxWidth="maxWidth"
      @switchTheme="switchTheme"
      @switchLang="switchLang"
      @addToHistory="addToHistory"
      @clearHistory="clearHistory"
      @changeMaxWidth="changeContainerMaxWidth"
    />
  </div>
</template>

<script>
import Calculator from './components/Calculator.vue';
import Icon from './components/Icon.vue';
import minisMixin from './mixins/minis.mixin';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'App',

  components: {
    Calculator,
    Icon,
  },

  mixins: [minisMixin],

  data: () => ({
    innerHeight: null,
    innerWidth: null,
    maxWidth: 300,
  }),

  computed: {
    ...mapState(['history']),
  },

  methods: {
    ...mapMutations(['addToHistory', 'clearHistory']),
    changeContainerMaxWidth(val) {
      this.maxWidth = Math.min(600, Math.max(val, 300));
    }
  },


  beforeMount() {
    this.innerHeight = innerHeight;
    this.innerWidth = innerWidth;
    window.addEventListener('resize', event => {
      this.innerHeight = innerHeight;
      this.innerWidth = innerWidth;
    })
  },
}
</script>

<style lang="scss">
::-webkit-scrollbar{
  width: 5px; 
	background-color: var(--content-bg-color);
}
::-webkit-scrollbar-thumb{
  width: 5px; 
	background-color: var(--special-color); 
}
::selection {
	background: var(--special-color); 
}

body {
  font-family: 'Noto Sans', sans-serif;
  margin: 0;
  display: flex;
  background-image: url("assets/confetti.svg");
  background-repeat: repeat;
  background-position: center;
  background-color: #333;
  min-height: 100vh;
  overflow: hidden;

  .loader {
    width: 30%;
    height: 100%;
    margin: auto;
    display: block;
    opacity: .5;
  }

  .container {
    width: 100vw;
    margin: 0 auto;
  }
}

@media screen and (min-width: 768px) {
  body {
    .container {
      max-height: 560px;
      margin: auto;
    }
  }
}
</style>
