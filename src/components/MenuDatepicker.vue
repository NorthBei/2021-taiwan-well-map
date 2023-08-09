<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="date"
        :label="label"
        :rules="rules"
        v-on="on"
        outlined
        readonly
        dense
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      @input="menu = false"
      color="primary"
      first-day-of-week="1"
      :day-format="d => parseInt(d.split('-')[2])"
      :min="today">
    </v-date-picker>
  </v-menu>
</template>
<script>
import dateformat from 'dateformat'

export default {
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    rules: Array
  },
  model: {
    prop: 'value', // parent component v-model value's name
    event: 'update' // update event's name
  },
  data: () => ({
    date: '',
    menu: false
  }),
  mounted () {
    this.date = this.value
  },
  watch: {
    date (newDate) {
      this.$emit('update', newDate)
    },
    value (newVal) {
      this.date = newVal
    }
  },
  computed: {
    today () {
      const taipeiTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Taipei' })
      return dateformat(taipeiTime, 'yyyy-mm-dd')
    }
  }
}
</script>
