<template>
  <div 
    class="minis__content"
    :style="{ minHeight: `${ appHeight }px` }"
    ref="calculator"
  >
      <div class="calculator__display">
        <div 
          v-if="!isDesktop"
          class="settings__button" 
          @click="$emit('openModal', 'settings')"
        >
          <Icon type="settings"/>
        </div>
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
          v-text="extendedValue == 'error' ? translate('error') : extendedValue || 0"
        />
      </div>

      <div class="calculator__buttons">
        <div class="calculator__wrap-row">
          <div class="calculator__button" @click="clear" v-text="value ? 'C' : 'AC'"/>
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

  </div>
</template>

<script>
import Icon from './app/Icon';

export default {
  name: 'LayoutContent',

  components: {
    Icon,
  },

  props: {
    appWidth: Number,
    appHeight: Number,
    isDesktop: Boolean,
    translate: Function,
    history: Array,
  },

  data: () => ({
    value: '',
    fontSize: 1,
    limit: 30,
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
    appWidth: 'changeFontSize',
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
      if(this.value == 'error') this.value = '';

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
      if(this.value == 'error') this.value = '';
      const lastValue = this.value.split(/(\/|\*|\+|\-)/g).slice(-1)[0];
      if(!lastValue) this.value += '0';
      if(!lastValue.includes('.')) this.value += '.';
    },
    plusMinus() {
      if(this.value == 'error') this.value = '';
      if(!this.value) this.value += '0';
      this.value = this.value.startsWith('-')
        ? this.value.slice(1)
        : `-${this.value}`;
    },
    percent(pow = 2) {
      const length = this.value.toString().replace(/^\d*(\.|)/, '').length;
      if(!this.value || this.value == 'error') return;
      if(this.limit <= length + pow) return;
      if(!/\d$/.exec(this.value)) return;
      this.value = (parseFloat(this.value) / (10 ** pow)).toFixed(length + pow);
    },

    clear() {
      if(this.value) {
        this.value = '';
        this.historyBack(true);
      } else {
        this.$emit('clearHistory');
      }
    },
    historyBack(isFull) {
      if(this.value == 'error') {
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
      if(this.value == 'error') return;
      this.value = this.value.replace(/(\-|\+|\*|\/|\.|\()*$/, '');
      if(!this.value) return;
      this.value += this.endsBrackets;
      const equation = this.value.match(/\d|\.|\-|\+|\*|\/|\(|\)/g).join('');
      const answer = parseFloat(eval(equation).toFixed(10));

      if(equation.replace(/(\(|\))/g, '') == answer) return;
      if(answer.toString().endsWith('Infinity') || isNaN(answer)) {
        this.value = 'error';
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
          this.$emit('switchSettings');
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
.minis__content {
  display: grid;
  grid-template-rows: 35% 65%;
  height: inherit;
  background-color: var(--main-bg-color);
  color: var(--text-color);
  font-size: 18px;
  position: relative;
  top: 0;
  z-index: 1;

  .calculator {
    display: grid;
    grid-template-rows: 35% 65%;
    height: 100%;
    background-color: var(--main-bg-color);
    color: var(--text-color);
    font-size: 24px;
    box-shadow: 0 3px 0 2px var(--main-bg-color);
    position: relative;


    &__display {
      padding: 20px;
      padding-right: 15px;
      display: grid;
      grid-template-rows: 1fr 30px;
      gap: .5rem;
      justify-content: flex-end;
      font-size: 30px;
      position: relative;
      box-sizing: border-box;
      z-index: 2;
      .settings__button {
        cursor: pointer;
        position: absolute;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: .5;
      }

      .calculator__history {
        overflow: auto;
        &_container {
          opacity: .5;
          font-size: .5em;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-end;
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
        justify-content: flex-end;
        align-items: flex-end;
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
  }
}

@media screen and (min-width: 768px) {
  .minis__content {
    border-radius: 10px;
    clip-path: polygon(
      0 5px, 5px 0, calc(100% - 5px) 0, 101% 5px, 
      101% calc(100% - 5px), calc(100% - 5px) 101%, 5px 101%, 0 calc(100% - 5px)
    );
    .calculator {
      border-radius: 10px;

      &__buttons .calculator__button-equal::after {
        padding-bottom: calc((560px * 0.65 - 120px)/5);
      }
    }
  }
}
</style>