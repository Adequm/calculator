<template>
  <div 
    class="navigation"
    :style="{ gridTemplateColumns: isDesktop ? '2fr 1fr' : '2fr 50px 1fr' }"
  >
    <button 
      v-if="!isModeCompare"
      class="navigation__item"
      v-text="isModeEditor ? 'История' : 'Редактор'"
      @click="$emit('switchModeEditor')"
    />
    <button v-else class="navigation__item nohover" style="cursor: default;">
      <span v-text="`Шаг: ${ compareQuestionIndex } из ${ compareMaxQuestionsIndex }`"/>
      <div class="compare_loader" :style="{ width: compareLoaderWidth }"/>
    </button>

    <button 
      v-if="!isDesktop"
      class="navigation__item nofocus nohover"
      @click="$emit('openModal', 'settings')"
    >
      <Icon type="settings"/>
    </button>

    <button 
      v-if="isModeEditor"
      class="navigation__item navigation__item-special"
      :disabled="!isEditorDataExist"
      @click="isEditorDataExist && $emit('switchModeCompare')"
    >
      <Icon :type="isModeCompare ? 'x' : 'send'"/>
    </button>
    <button 
      v-else
      class="navigation__item"
      style="color: var(--special-color);"
      :disabled="!isHistoryExist"
      @click="isHistoryExist && $emit('removeFromHistory')"
    >
      <Icon type="trash"/>
    </button>
  </div>
</template>

<script>
import Icon from './Icon';

export default {
  name: 'Navigation',

  components: {
    Icon,
  },

  props: {
    isDesktop: Boolean,
    isModeCompare: Boolean,
    isModeEditor: Boolean,
    isHistoryExist: Boolean,
    isEditorDataExist: Boolean,
    compareQuestionIndex: Number,
    compareMaxQuestionsIndex: Number,
  },

  data: () => ({
    console,
  }),

  computed: {
    compareLoaderWidth: ths => `${ ths.compareQuestionIndex / ths.compareMaxQuestionsIndex * 100 }%`,
  },
};
</script>

<style lang="scss" scope>
.navigation {
  user-select: none; 
  padding: 20px;
  border-radius: 10px;
  display: grid;
  grid-auto-flow: column dense;
  gap: 10px;
  box-sizing: border-box;
  z-index: 5;
  font-size: 16px;
  font-weight: bold;

  button:not(.nofocus):focus {
    outline: 1px solid var(--text-color);
  }

  &__item {
    cursor: pointer;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: var(--content-bg-color);
    user-select: none; 
    &:not(.nohover):hover { opacity: .8; }
    &-special {
      background-color: var(--special-color);
      color: #F3F3F3;
    }
    &[disabled] {
      cursor: default;
      color: var(--main-bg-color) !important;
      background-color: var(--content-bg-color);
    }
    .compare_loader {
      position: absolute;
      height: 100%;
      left: 0;
      top: 0;
      max-width: 100%;
      border-radius: 10px;
      background-color: var(--special-color);
      opacity: .5;
      transition: width .5s;
    }
  }
}
</style>