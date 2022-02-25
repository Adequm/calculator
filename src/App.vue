<template>
  <div 
    class="container" 
    :style="{ 
      height: `${ innerHeight }px`, 
      maxWidth: innerWidth < 768 ? '100vw' : `${ containerWidth }px`,
      maxHeight: innerWidth < 768 ? '100vh' : `${ containerHeight }px`,
    }"
  >
    <Icon v-if="!isPageLoad" type="loader" class="loader" rotate/>

    <div v-else class="minis__wrapper">
      <SettingsDesktop
        v-if="isDesktop"
        :themeIcon="themeMain.icon"
        v-model="isClosedSettings"
        @switchTheme="switchTheme"
        @switchLang="switchLang"
      />

      <LayoutContent
        :appWidth="appWidth" 
        :appHeight="appHeight"
        :isDesktop="isDesktop"
        :history="history"
        :translate="translate"
        :style="{ filter: openedModalName ? 'blur(2px)' : 'none' }"
        @openModal="openedModalName = $event"
        @addToHistory="addToHistory"
        @clearHistory="clearHistory"
      />

      <AppModal v-model="openedModalName">
        <SettingsMobile 
          v-if="openedModalName == 'settings'"
          :themeIcon="themeMain.icon"
          @switchTheme="switchTheme"
          @switchLang="switchLang"
        />
      </AppModal>

      <div v-if="isDesktop" class="resize_button" @mousedown.prevent="startResize"/>
      <a v-if="isDesktop" href="https://adequm.github.io/minis" target="_blank" class="minis">Minis</a>
    </div>

  </div>
</template>

<script>
import minisMixin from './mixins/minis.mixin';
import Icon from './components/app/Icon';
import SettingsDesktop from './components/app/SettingsDesktop';
import SettingsMobile from './components/app/SettingsMobile';
import AppModal from './components/app/AppModal';
import LayoutContent from './components/LayoutContent';

import { mapState, mapMutations } from 'vuex';

export default {
  components: {
    LayoutContent,
    AppModal,
    SettingsDesktop,
    SettingsMobile,
    Icon,
  },

  mixins: [minisMixin],

  data: () => ({
    containerWidth: 300,
    containerHeight: 560,
    innerHeight: null,
    innerWidth: null,
    startResizeX: null,
    startResizeY: null,
    startResizeWidth: null,
    startResizeHeight: null,
    isClosedSettings: true,
    openedModalName: null,
    onInputFocus: false,
  }),

  watch: {
    innerHeight: 'resizeContainer',
    innerWidth: 'resizeContainer',
    isDesktop(isDesktop) {
      if(isDesktop && this.openedModalName == 'settings') {
        this.openedModalName = null;
        this.isClosedSettings = false;
      }
    }
  },

  computed: {
    ...mapState(['history']),
    isDesktop: ths => ths.innerWidth >= 768,
    appWidth: ths => ths.isDesktop ? ths.containerWidth : ths.innerWidth,
    appHeight: ths => ths.isDesktop ? 560 : ths.innerHeight,
  },

  methods: {
    ...mapMutations(['clearHistory', 'addToHistory']),
    resizeContainer(sizes = {}) {
      const containerWidth = sizes.containerWidth || this.containerWidth;
      const containerHeight = sizes.containerHeight || this.containerHeight;
      this.containerWidth = _.clamp(containerWidth, 300, this.innerWidth - 150);
      this.containerHeight = _.clamp(containerHeight, 560, this.innerHeight - 100);
    },

    setContainerWidth({ pageX, pageY }) {
      requestAnimationFrame(() => {
        if(_.isNull(this.startResizeX) || _.isNull(this.startResizeWidth)) return;
        const containerWidth = (pageX - this.startResizeX) * 2 + this.startResizeWidth;
        const containerHeight = (pageY - this.startResizeY) * 2 + this.startResizeHeight;
        this.resizeContainer({ containerWidth, containerHeight });
      })
    },

    startResize(event) {
      this.startResizeX = event.pageX;
      this.startResizeY = event.pageY;
      this.startResizeWidth = this.containerWidth;
      this.startResizeHeight = this.containerHeight;
      document.addEventListener('mousemove', this.setContainerWidth);
      document.addEventListener('mouseup', this.stopResize);
      window.addEventListener('mouseleave', this.stopResize);
    },

    stopResize() {
      this.startResizeX = null;
      this.startResizeY = null;
      this.startResizeWidth = null;
      this.startResizeHeight = null;
      document.removeEventListener('mousemove', this.setContainerWidth);
      document.removeEventListener('mouseup', this.stopResize);
      window.removeEventListener('mouseleave', this.stopResize);
    },
  },

  beforeMount() {
    const updateInnerSize = () => {
      this.innerWidth = document.body.offsetWidth;
      if(this.onInputFocus) return;
      this.innerHeight = innerHeight;
    }

    updateInnerSize();
    window.addEventListener('resize', updateInnerSize);
    setInterval(updateInnerSize, 1000);
  },
};
</script>

<style lang="scss">
::-webkit-scrollbar {
  width: 5px; 
	background-color: var(--content-bg-color);
}
::-webkit-scrollbar-thumb {
  width: 5px; 
	background-color: var(--special-color); 
}
::selection {
	background: var(--special-color); 
}

button {
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  border: none;
  outline: none;
  color: inherit;
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

    .minis__wrapper {
      width: 100%;
      height: 100%;
      position: relative;
      box-shadow: 0 3px 0 2px var(--main-bg-color);
      border-radius: 10px;
      box-sizing: border-box;

      .minis {
        display: flex;
        justify-content: center;
        margin-top: 5px;
        font-weight: bold;
        color: #1A1D24;
        opacity: .5;
        cursor: pointer;
        transition: opacity .2s;
        text-decoration: none;
        width: calc((100% - 100px)/4);
        margin-right: 20px;
        position: absolute;
        top: 100%;
        right: 0;
      }

      .resize_button {
        position: absolute;
        display: block;
        width: 10px;
        height: 10px;
        background: var(--special-color);
        transform: translateY(-100%);
        right: 0;
        top: 100%;
        z-index: 101;
        clip-path: polygon(100% 0, 100% 100%, 0 100%);
        border-radius: 0 0 10px 0;
        cursor: se-resize;
      }
    }

  }
}

@keyframes rotate {
  to { transform: rotate(360deg); }
}

@media screen and (min-width: 768px) {
  body .container {
    margin: auto;
  }
}
</style>
