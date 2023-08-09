<template>
  <div>
    <div v-if="well">
      <div class="px-3">
        <h1 class="text-h6">{{ well["名稱"] }}</h1>
        <h2 class="text-subtitle-2">{{ well["位址"] }}</h2>
      </div>
      <v-list>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="primary">mdi-map-marker</v-icon>
          </v-list-item-icon>
          <v-list-item-content>{{ well["位址"] }}</v-list-item-content>
          <v-list-item-icon>
            <v-btn
              @click="direction"
              color="primary"
              outlined
              fab
              x-small
            >
              <v-icon>mdi-directions</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item v-if="well['可取水時間']">
          <v-list-item-icon>
            <v-icon color="primary">mdi-clock-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>可取水時間：{{ well["可取水時間"] }}</v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="primary">mdi-water-pump</v-icon>
          </v-list-item-icon>
          <v-list-item-content>出水量：{{ well["出水量(噸/日)"] }}噸/日</v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="primary">mdi-water-check</v-icon>
          </v-list-item-icon>
          <v-list-item-content>水質是否符合飲用水標準：{{well["水質(是否符合飲用水標準)"]}}</v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="primary">mdi-office-building</v-icon>
          </v-list-item-icon>
          <v-list-item-content>管理單位：{{ well["管理單位"] }}</v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="primary">mdi-phone</v-icon>
          </v-list-item-icon>
          <v-list-item-content>{{ well["聯絡電話"] }}</v-list-item-content>
          <v-list-item-icon>
            <v-btn
              @click="phone"
              color="primary"
              outlined
              fab
              x-small
            >
              <v-icon>mdi-phone</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
      <div v-if="well['備註']" class="pa-3">
        <h3 class="text-subtitle-2 mb-3">備註</h3>
        <p class="text-body-2 note">{{ well["備註"] }}</p>
      </div>
      <div>
        <v-btn fab text small color="grey darken-2" @click="prev">
          <v-icon small>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn fab text small color="grey darken-2" @click="next">
          <v-icon small>mdi-chevron-right</v-icon>
        </v-btn>
        <span v-if="$refs.calendar">
          {{ $refs.calendar.title }}
        </span>
        <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
          今天
        </v-btn>
      </div>
      <v-calendar
        id="calendar"
        v-model="day"
        :events="events"
        first-interval="8"
        interval-count="12"
        interval-height="30"
        color="primary"
        type="4day"
        locale="tw"
        ref="calendar"
      ></v-calendar>
      <v-form ref="form" class="pa-3 mt-3">
        <div>
          <MenuDatepicker v-model="date" label="取水日期" :rules="[rules.required]" />
        </div>
        <div>
          <MenuTimepicker v-model="startTime" label="開始取水時間" :rules="[rules.required]" />
          <MenuTimepicker v-model="endTime" label="結束取水時間" :rules="[rules.required]" />
        </div>
        <div class="d-flex align-center">
          <span class="text-subtitle-2">預計取用</span>
          <Counter v-model="qty" :min="1" class="mx-2" />
          <span class="text-subtitle-2">公升</span>
        </div>
        <v-btn @click="submit" :loading="isButtonLoading" color="primary" block> 預約取水 </v-btn>
      </v-form>
    </div>
  </div>
</template>
<script>
import MenuDatepicker from '@/components/MenuDatepicker.vue'
import MenuTimepicker from '@/components/MenuTimepicker.vue'
import Counter from '@/components/Counter.vue'
import dateformat from 'dateformat'

const today = new Date()
const tomorrow = new Date()
tomorrow.setDate(today.getDate() + 1)

export default {
  props: {
    well: {
      type: [Object, null],
      default: null
    }
  },
  data: () => ({
    day: '',
    date: '',
    startTime: '',
    endTime: '',
    isButtonLoading: false,
    qty: 1,
    events: [
      {
        name: '已預約',
        start: new Date(`${dateformat(today, 'yyyy-mm-dd')} 09:10`),
        end: new Date(`${dateformat(today, 'yyyy-mm-dd')} 11:30`),
        timed: true
      },
      {
        name: '已預約',
        start: new Date(`${dateformat(today, 'yyyy-mm-dd')} 17:30`),
        end: new Date(`${dateformat(today, 'yyyy-mm-dd')} 18:30`),
        timed: true
      },
      {
        name: '已預約',
        start: new Date(`${dateformat(tomorrow, 'yyyy-mm-dd')} 10:25`),
        end: new Date(`${dateformat(tomorrow, 'yyyy-mm-dd')} 13:50`),
        timed: true
      },
      {
        name: '已預約',
        start: new Date(`${dateformat(tomorrow, 'yyyy-mm-dd')} 15:10`),
        end: new Date(`${dateformat(tomorrow, 'yyyy-mm-dd')} 17:20`),
        timed: true
      }
    ],
    rules: {
      required: value => !!value || '不能空白喔！'
    }
  }),
  methods: {
    direction () {
      const { lat, lng } = this.well.position
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
      )
    },
    phone () {
      const phone = this.well['聯絡電話']
      document.location.href = `tel:${phone}`
    },
    setToday () {
      this.day = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    submit () {
      if (!this.$refs.form.validate()) return
      if (this.startTime > this.endTime) {
        alert('取水開始時間不得小於結束時間')
        return
      }
      this.isButtonLoading = true
      setTimeout(() => {
        this.isButtonLoading = false
        this.events.push({
          name: '已預約',
          start: new Date(`${this.date} ${this.startTime}`),
          end: new Date(`${this.date} ${this.endTime}`),
          timed: true
        })
      }, 1500)
    }
  },
  components: {
    MenuDatepicker,
    MenuTimepicker,
    Counter
  }
}
</script>
<style lang="scss" scoped>

.note {
  white-space: pre-line;
}
</style>
