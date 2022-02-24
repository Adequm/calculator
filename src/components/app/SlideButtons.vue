<template>
  <div class="slide-buttons__container">

    <button 
      class="slide-button" 
      :disabled="isBeginning"
      @click="setSlide(-1)">
      <Icon type="chevrons-left"/>
    </button>
    <button 
      class="slide-button" 
      :disabled="isEnd"
      @click="setSlide(1)">
      <Icon type="chevrons-right"/>
    </button>

  </div>
</template>

<script>
import _ from 'lodash';
import Icon from './Icon';

export default {
  name: 'SlideButtons',

  components: {
    Icon,
  },

  props: {
    value: Number,
    limit: Number,
    isEnd: Boolean,
    isBeginning: Boolean,
  },

  methods: {
   setSlide(shift) {
     const value = _.clamp(this.value + shift, 0, this.limit - 1);
     this.$emit('input', value);
    },
  },
};
</script>

<style lang="scss" scoped>
.slide-buttons__container {
  gap: 10px; 
  padding: 10px;
  display: grid;
  grid-auto-flow: column;
  .slide-button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--content-bg-color);
    border-radius: 10px;
    border: none;
    outline: none;
    cursor: pointer;
    &:not(&[disabled]):hover {
      color: var(--special-color);
      opacity: .8;
    }
    &[disabled] {
      cursor: default;
      color: var(--main-bg-color);
    }
    &:focus {
      box-shadow: inset 0 0 0 1px var(--special-color);
    }
  }
}
</style>