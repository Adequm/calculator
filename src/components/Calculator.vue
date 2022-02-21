<template>
  <div class="wrapper">
    <div class="calculator" ref="calculator">

      <div class="settings" :class="{ isClosedSettings }">
        <Icon type="settings" @click="isClosedSettings = !isClosedSettings"/>
        <Icon :type="themeIcon" @click="$emit('switchTheme', 'main')"/>
        <Icon type="heart" @click="$emit('switchTheme', 'special')"/>
        <Icon type="globe" @click="$emit('switchLang')"/>
        <!-- <Icon type="help-circle"/> -->
      </div>

      <div class="calculator__display">
        <div class="calculator__history" ref="calculator__history">
          <div class="calculator__history_container">
            <span
              v-for="([equation, answer], index) of history"
              :key="index + '|' + value"
              @click="value = equation"
              v-text="getHistoryPoint(equation, answer, index)"
            />
          </div>
        </div> 
        <div 
          class="calculator__current"
          ref="calculator__current"
          :class="{ equal: historyLast == value }"
          :style="{ opacity: value.length ? '1' : '.25', fontSize: `${ fontSize }em` }"
          :data-brackets="endsBrackets"
          v-text="extendedValue || 0"
        />
      </div>

      <div class="calculator__buttons">
        <div class="calculator__wrap-row">
          <div class="calculator__button" @click="clear">AC</div>
          <div class="calculator__button"  @click="historyBack()"><Icon type="delete"/></div>
          <div class="calculator__button" @click="percent()"><Icon type="percent"/></div>
        </div>
        <div class="calculator__wrap-column">
          <div 
            v-for="(sign, signName) of signs"
            :key="sign"
            class="calculator__button"
            @click="addSign(sign)"
          ><Icon :type="signName"/></div>
        </div>

        <div 
          v-for="num of [7, 8, 9, 4, 5, 6, 1, 2, 3]"
          :key="`num_${ num }`"
          class="calculator__button"
          @click="addSign(num.toString())"
          v-text="num"
        />
        <div class="calculator__button" @click="addDot">.</div>
        <div class="calculator__button" @click="addSign('0')">0</div>
        <div class="calculator__button" @click="plusMinus">±</div>
        <div class="calculator__button calculator__button-equal" @click="equal"/>
      </div>

      <div class="resize_button" @mousedown="startResize"/>
    </div>
    <a href="https://adequm.github.io/minis" target="_blank" class="minis">Minis</a>
  </div>
</template>

<script>
import Icon from './Icon';

export default {
  name: 'Calculator',

  components: {
    Icon,
  },

  props: {
    history: Array,
    themeIcon: String,
    minisLang: String,
    maxWidth: Number,
  },

  data: () => ({
    value: '',
    fontSize: 1,
    limit: 30,
    isClosedSettings: true,
    isResize: false,
    startX: null,
    signs: {
      divide: '/',
      x: '*',
      minus: '-',
      plus: '+'
    }
  }),

  watch: {
    value(value) {
      this.changeFontSize();
      if(value.length <= this.limit) return;
      this.value = this.value.slice(0, this.limit);
    },
    maxWidth: 'changeFontSize',
  },

  computed: {
    historyLast() {
      const value = this.history.slice(-1)[0];
      return value && value[1];
    },
    extendedValue() {
      return this.value
        .replace(/\+/g, ' + ')
        .replace(/\-/g, ' - ')
        .replace(/\*/g, ' * ')
        .replace(/\//g, ' / ')
    },
    brackets() {
      const startsBracket = this.value.match(/\(/g) || [];
      const endsBracket = this.value.match(/\)/g) || [];
      const starts = startsBracket.length;
      const ends = endsBracket.length;
      return { starts, ends, isClosed: starts === ends };
    },
    endsBrackets() {
      const { starts, ends } = this.brackets;
      return new Array(starts - ends).fill(')').join('');
    },
  },

  methods: {
    setMaxWidth({ pageX }) {
      requestAnimationFrame(() => {
        const maxWidth = pageX - this.startResizeX + this.startResizeWidth;
        this.$emit('changeMaxWidth', maxWidth);
      })
    },

    startResize(event) {
      this.startResizeX = event.pageX;
      this.startResizeWidth = this.maxWidth;
      document.addEventListener('mousemove', this.setMaxWidth);
      document.addEventListener('mouseup', this.stopResize);
    },

    stopResize() {
      this.startResizeX = null;
      this.startResizeWidth = null;
      document.removeEventListener('mousemove', this.setMaxWidth);
      document.removeEventListener('mouseup', this.stopResize);
    },

    checkFontSize() {
      const calculator = this.$refs.calculator;
      const ref = this.$refs.calculator__current;
      return calculator.clientWidth - ref.clientWidth - 50;
    },
    changeFontSize(value) {
      this.$nextTick(() => {
        const width = this.checkFontSize();
        if(width <= 0) {
          if(this.fontSize <= 0.1) return;
          this.fontSize = +(this.fontSize - 0.1).toFixed(1);
          this.changeFontSize();
        } else if(width > 100) {
          if(this.fontSize >= 1) return;
          this.fontSize = +(this.fontSize + 0.1).toFixed(1);
          this.changeFontSize();
        }
      })
    },

    getHistoryPoint(equation, answer, index) {
      return this.historyLast == this.value && index == this.history.length - 1
        ? equation 
        : `${equation} = ${answer}`
    },

    addSign(sign) {
      if(this.value == 'Ошибка') this.value = '';

      const isNumberKey = !isNaN(+sign);
      const isEmpty = !this.value;
      const isSignCalcMinus = sign == '-';
      const isSignCalcNotMinus = !!/(\/|\*|\+)/.exec(sign);

      const isFractionValue = !!/\d+\.\d+$/.exec(this.value);

      const isLastSign = !!/(\/|\*|\+|\-)$/.exec(this.value);
      const isLastSignBracketStart = this.value.endsWith('(');
      const isLastSignBracketEnd = this.value.endsWith(')');
      const isLastSignNumber = !!/\d$/.exec(this.value);
      const isLastSignDot = this.value.endsWith('.');

      // Если знак перед скобками не указан, то умножать на значение в скобках
      if(sign == '(' && (isLastSignNumber || isLastSignBracketEnd)) this.value += '*';

      // Нельзя после закрывающейся скобки писать цифру
      if(isNumberKey && isLastSignBracketEnd) return;

      // Нельзя писать ')' больше '('
      if(this.brackets.isClosed && sign == ')') return;

      // Нельзя начинать с [+, *, /]
      if((isEmpty || isLastSignBracketStart) && isSignCalcNotMinus) return;

      // Нельзя подряд писать 0
      if(this.value.endsWith('0') && isNumberKey && !isFractionValue) return;

      // Нельзя подряд ставить минусы
      if(isSignCalcMinus && this.value.endsWith('-')) return;

      // Нельзя после '.' ставить знаки
      if(!isNumberKey && isLastSignDot) return;

      // Перезапись последнего знака [-, +, *, /]
      if(!isEmpty && isLastSign && isSignCalcNotMinus) {
        if(this.value == '-') return;
        this.historyBack();
        return this.addSign(sign);
      }

      this.value += sign;
    },

    addDot() {
      if(this.value == 'Ошибка') this.value = '';
      const lastValue = this.value.split(/(\/|\*|\+|\-)/g).slice(-1)[0];
      if(!lastValue) this.value += '0';
      if(!lastValue.includes('.')) this.value += '.';
    },
    plusMinus() {
      if(this.value == 'Ошибка') this.value = '';
      if(!this.value) this.value += '0';
      this.value = this.value.startsWith('-')
        ? this.value.slice(1)
        : `-${this.value}`;
    },
    percent(pow = 2) {
      const length = this.value.toString().replace(/^\d*(\.|)/, '').length;
      if(!this.value || this.value == 'Ошибка') return;
      if(this.limit <= length + pow) return;
      if(!/\d$/.exec(this.value)) return;
      this.value = (parseFloat(this.value) / (10 ** pow)).toFixed(length + pow);
    },

    clear() {
      this.value = '';
      this.$emit('clearHistory');
    },
    historyBack(isFull) {
      if(this.value == 'Ошибка') {
        this.value = '';
        return;
      }
      if(isFull) {
        this.value = '';
      } else {
        this.value = this.value.slice(0, -1);
      }
    },
    equal() {
      if(this.value == 'Ошибка') return;
      this.value = this.value.replace(/(\-|\+|\*|\/|\.|\()*$/, '');
      if(!this.value) return;
      this.value += this.endsBrackets;
      const equation = this.value.match(/\d|\.|\-|\+|\*|\/|\(|\)/g).join('');
      const answer = parseFloat(eval(equation).toFixed(10));

      if(equation.replace(/(\(|\))/g, '') == answer) return;
      if(answer.toString().endsWith('Infinity') || isNaN(answer)) {
        this.value = 'Ошибка';
        return;
      }

      this.value = answer.toString();
      this.$refs.calculator__history.scrollTop = 1000;
      this.$emit('addToHistory', [equation, answer]);
    },

    keydown({ key, shiftKey }) {
      switch(key) {
        case '0': case '1': case '2': case '3': case '4': 
        case '5': case '6': case '7': case '8': case '9': 
        case '+': case '-': case '*': case '/':
        case '(': case ')':
          this.addSign(key);
          break;
        case '.': case ',':
          this.addDot();
          break;
        case '%':
          this.percent();
          break;
        case 'Backspace':
          this.historyBack(shiftKey);
          break;
        case 'Enter':
          this.equal();
          break;
        case 'Escape':
          this.isClosedSettings = !this.isClosedSettings;
          break;
      }
    },
  },

  beforeMount() {
    document.addEventListener('keydown', this.keydown);
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.keydown);
  },
};
</script>

<style lang="scss">
.wrapper {
  width: 100%;
  height: 100%;
  .minis { 
    display: none;
  }

  .calculator {
    display: grid;
    grid-template-rows: 35% 65%;
    height: 100%;
    background-color: var(--main-bg-color);
    color: var(--text-color);
    font-size: 24px;
    box-shadow: 0 3px 0 2px var(--main-bg-color);
    position: relative;

    .settings {
      display: grid;
      align-items: center;
      justify-items: center;
      position: absolute;
      width: calc((100vw - 100px)/4);
      grid-auto-rows: 50px;
      max-width: 50px; 
      min-height: 35%;
      left: 0;
      z-index: 3;
      &.isClosedSettings {
        & > svg:nth-child(1) { opacity: 1; }
        & > svg:nth-child(n+2) { display: none; }
      }
      & > svg {
        cursor: pointer;
        width: 100%;
        &:nth-child(1) { opacity: .5; }
        &:nth-child(n+2) { opacity: 1; }
      }
    }

    &__display {
      padding: 20px;
      padding-right: 15px;
      display: grid;
      grid-template-rows: 1fr 30px;
      gap: .5rem;
      justify-content: end;
      font-size: 30px;
      position: relative;
      box-sizing: border-box;
      z-index: 2;
      .calculator__history {
        overflow: auto;
        &_container {
          opacity: .5;
          font-size: .5em;
          display: flex;
          flex-direction: column;
          justify-content: end;
          align-items: end;
          padding-right: 5px;
          min-height: 100%;
          span {
            text-align: end;
            margin-top: 0.2em;
            cursor: pointer;
            &:hover {
              color: var(--special-color)
            }
          }
        }
      }
      .calculator__current {
        display: flex;
        justify-content: end;
        align-items: end;
        line-height: 1em;
        margin-left: auto;
        padding-right: 5px;
        &::after {
          content: attr(data-brackets);
          opacity: .25;
        }
      }
      .equal.calculator__current::before {
        content: '=';
        position: absolute;
        left: 20px;
      }
    }

    &__buttons {
      user-select: none; 
      padding: 20px;
      border-radius: 10px;
      background-color: var(--content-bg-color);
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      box-sizing: border-box;
      z-index: 5;

      .calculator__wrap-row {
        grid-column: 1/4;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        background-color: var(--main-bg-color);
        border-radius: 10px;
      }

      .calculator__wrap-column {
        grid-row: 1/5;
        grid-column: 4;
        display: grid;
        gap: 20px;
        background-color: var(--main-bg-color);
        border-radius: 10px;
        color: var(--special-color);
      }

      .calculator__button {
        cursor: pointer;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        opacity: .8;
        &-equal {
          background-color: var(--special-color);
          clip-path: polygon(0 0, 105% 0, 115% calc(50% + 20px), 0 calc(50% + 20px));
          color: #F3F3F3;
          height: 200%;
          &::after {
            content: '=';
            padding-bottom: calc((100vh * 0.65 - 120px)/5);
            position: absolute;
          }
        }
      }
    }

    .resize_button {
      display: none;
    }
  }
}



@media screen and (min-width: 768px) {
  .wrapper {
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
      float: right;
      margin-right: 20px;
    }
    .calculator {
      border-radius: 10px;

      .settings {
        align-content: center;
        left: calc(100% + 20px);
        color: var(--special-color);
        z-index: 1;
        &::after, &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--main-bg-color);
          border-radius: 10px;
          z-index: -1;
          transition: transform .2s;
        }
        &::before {
          transform: translateX(calc(-100% - 18px));
          z-index: 1;
        }
        & > svg {
          transition: transform .2s;
          opacity: 1;
          &:nth-child(1) { 
            opacity: 1;
            position: absolute;
            bottom: 100%;
            right: calc(50% + 10px);
          }
        }
        &.isClosedSettings {
          &::after, & > svg:nth-child(n+2) {
            display: block;
            transform: translateX(calc(-100% - 20px))
          }
        }
      }

      &__buttons .calculator__button-equal::after {
        padding-bottom: calc((560px * 0.65 - 120px)/5);
      }

      .resize_button {
        position: absolute;
        display: block;
        width: 10px;
        height: 10px;
        background: var(--special-color);
        bottom: 0;
        right: 0;
        z-index: 6;
        clip-path: polygon(100% 0, 100% 100%, 0 100%);
        border-radius: 0 0 10px 0;
        cursor: w-resize;
      }
    }
  }
}
</style>