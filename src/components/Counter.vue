<template>
  <div class="counter">
    <v-btn @click.stop="minus" color="primary" :disabled="isMinusDisable || disabled" text icon small>
      <v-icon>mdi-minus</v-icon>
    </v-btn>
    <div class="input">{{qty}}</div>
    <v-btn @click.stop="add" color="primary" :disabled="isPlusDisable || disabled" text icon small>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>
<script>
export default {
  props: {
    qty: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'qty',
    event: 'update'
  },
  data: () => ({
    isPlusDisable: false,
    isMinusDisable: false
  }),
  created () {
    this.isPlusDisable = this.qty >= this.max
    this.isMinusDisable = this.qty <= this.min
  },
  methods: {
    add () {
      if ((this.qty + 1) > this.max) {
        return
      }
      this.changeValue(this.qty + 1)
    },
    minus () {
      if ((this.qty - 1) < this.min) {
        return
      }
      this.changeValue(this.qty - 1)
    },
    changeValue (qty) {
      this.isPlusDisable = qty >= this.max
      this.isMinusDisable = qty <= this.min
      this.$emit('update', qty)
    }
  }
}
</script>
<style lang="scss" scoped>
$size: 32px;

.counter {
  display: flex;
  align-items: center;

  .input {
    min-height: $size;
    max-height: $size;
    min-width: $size;
    max-width: $size;
    line-height: $size;
    text-align: center;
    margin: 3px;
  }
}
</style>
