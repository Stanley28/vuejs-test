<template>
  <input
    ref="input"
    type="text"
    @input="onInput"
    @blur="onBlur"
    class="ui-money"
  />
</template>

<script>
import formatMoney from '@/helpers/formatMoney';

export default {

  name: 'UiMoney',

  props: {
    value: {
      type: Number,
      require: true,
    },
  },

  data() {
    return {
      valueInput: null,
    };
  },

  mounted() {
    if (this.value) {
      this.$refs.input.value = this.value;

      this.dispatchInputEvent();
    }
  },

  methods: {
    onInput(e) {
      const { target } = e;
      const { value } = target;

      this.valueInput = this.formatValue(value);
      e.target.value = this.valueInput;
    },

    onBlur(e) {
      const { target } = e;
      const { value } = target;

      if (value[value.length - 1] === '.') {
        this.valueInput = value.substring(0, value.length - 1);
        e.target.value = this.valueInput;
      }
    },

    dispatchInputEvent() {
      this.$refs.input.dispatchEvent(new Event('input', { bubbles: true }));
    },

    formatValue(value) {
      // commas to points
      let handledValue = value.replace(/,/g, '.');

      // remove spaces
      handledValue = handledValue.replace(/\s/g, '');

      // remove all symbols, except numbers and points
      handledValue = handledValue.replace(/[^\d|.]/g, '');
      const match = handledValue.match(/\d{1,}\.\d?\d?|\d{1,}/);

      if (match) {
        [handledValue] = match;
      }

      return formatMoney(handledValue);
    },
  },

  watch: {
    valueInput() {
      this.$emit('input', this.valueInput ? +this.valueInput.toString().replace(/\s/g, '') : undefined);
    },
  },
};
</script>
