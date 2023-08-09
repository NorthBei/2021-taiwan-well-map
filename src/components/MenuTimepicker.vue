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
        v-model="time"
        :label="label"
        :rules="rules"
        v-on="on"
        outlined
        readonly
        dense
      ></v-text-field>
    </template>
    <v-time-picker
      v-model="time"
      @input="menu = false"
      color="primary"
      format="24hr"
      :allowed-minutes="allowedMinutes">
    </v-time-picker>
  </v-menu>
</template>
<script>
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
    time: '',
    menu: false
  }),
  mounted () {
    this.time = this.value
  },
  watch: {
    time (newDate) {
      this.$emit('update', newDate)
    },
    value (newVal) {
      this.time = newVal
    }
  },
  methods: {
    allowedMinutes: v => v % 5 === 0
  },
  computed: {
  }
}
</script>
