<template>
  <div 
    class="container" 
    :class="{ 
      fullscreen: isFullscreen || isFrame, 
      fullscreenFrame: isFullscreenInFrame,
    }"
    :style="{ 
      height: `${ innerHeight }px`, 
      maxHeight: isDesktop ? `${ containerHeight }px` : '100vh',
    }"
  >
    <AppLoader v-if="!isPageLoad" :size="100" rotate/>

    <div v-else class="frames__container">
      <div 
        v-for="(minis, minisIndex) of links"
        :key="`${minis}_${minisIndex}`"
        v-show="!isFullscreen || framePageIndex == minisIndex"
        class="minis__wrapper"
        :style="{ 
          width: `${ appWidth }px`,
          maxWidth: `${ isFullscreen || !isWidthMore768 || isFullscreenInFrame ? appWidth : containerWidth }px`,
        }"
      >
        <SettingsDesktop
          v-if="!minisIndex && isDesktop && !isFrame"
          :themeIcon="themeMain.icon"
          :appHeight="appHeight"
          :appWidth="appWidth"
          :translate="translate"
          :translateDef="translateDef"
          :showHints="minisHints"
          v-model="isClosedSettings"
          @switchHints="switchHints"
          @switchTheme="switchTheme"
          @switchLang="switchLang"
          @switchFullscreen="$store.commit(switchFullscreenKey)"
        />

        <LayoutContent
          v-if="minis == projectKey"
          ref="layoutContent"
          :appWidth="appWidth" 
          :appHeight="appHeight"
          :history="history"
          :style="{ filter: openedModalName ? 'blur(2px)' : 'none' }"
          :isFrame="isFrame"
          :reRender="!isFullscreen || framePageIndex == minisIndex"
          :isShowSettingsButton="isShowSettingsButton"
          @openModal="openModal"
          @addToHistory="addToCalculatorHistory"
          @clearHistory="clearHistory"
          @switchSettings="switchSettings"
        />

        <LayoutFrame
          v-else
          ref="LayoutFrame"
          :isResize="!!startResizeX"
          :key="`${minisIndex}_${minis}_${isFullscreen}`"
          :link="`${ domen + minis }?isFullscreen=${ isFullscreen || !isWidthMore768 }&index=${ minisIndex }`"
          :style="{ filter: openedModalName ? 'blur(2px)' : 'none' }"
          @load="initFrameSettingsWatcher(minisIndex)"
        />

        <AppModal 
          v-if="!isFullscreen || framePageIndex == minisIndex"
          v-model="openedModalName"
          :isRoundedBorder="isWidthMore768 && !isFullscreen"
        >
          <SettingsMobile 
            v-if="openedModalName == 'settings'"
            :themeIcon="themeMain.icon"
            :isWidthMore768="isWidthMore768"
            :showArrows="links.length > 1"
            :title="translateChain(minis)('title')()"
            @switchTheme="switchTheme"
            @switchLang="switchLang"
            @switchFullscreen="$store.commit(switchFullscreenKey)"
            @clickToArrow="clickToArrow"
          />
        </AppModal>

        <div 
          v-if="isDesktop" 
          class="resize_button" 
          @mousedown.prevent="startResize"
          @dblclick.prevent="autoResize"
        />
        <a 
          v-if="isShowMinisButton" 
          href="https://adequm.github.io/minis" 
          target="_blank" 
          class="minis"
          v-text="'Minis'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { AppLoader, AppModal, SettingsDesktop, SettingsMobile, LayoutFrame } from '@minis-core/components';
import { minisMixin, resizeMixin, faviconMixin, translateMixin, frameMixin, coreMixin } from '@minis-core/mixins';
import LayoutContent from './components/LayoutContent';

import { mapState, mapMutations } from 'vuex';

export default {
  components: {
    AppModal,
    AppLoader,
    SettingsDesktop,
    SettingsMobile,
    LayoutContent,
    LayoutFrame,
  },

  mixins: [
    minisMixin, 
    resizeMixin, 
    faviconMixin, 
    translateMixin, 
    frameMixin,
    coreMixin,
  ],

  computed: {
    ...mapState([
      'history',
    ]),
  },

  methods: {
    ...mapMutations([
      'clearHistory', 
      'addToCalculatorHistory', 
    ]),
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

  .container {
    width: 100vw;
    margin: 0 auto;

    .frames__container {
      height: 100%; 
      display: flex; 
      justify-content: center; 
      gap: 20px; 
      flex-direction: row-reverse;
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
          margin-left: -10px;
          margin-right: 20px;
          bottom: 0;
          padding: 15px 25px;
          font-weight: bold;
          color: var(--special-color);
          opacity: .25;
          cursor: pointer;
          transition: opacity .2s;
          text-decoration: none;
          position: absolute;
          &:hover {
            opacity: .5;
          }
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
