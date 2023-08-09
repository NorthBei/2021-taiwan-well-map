<template>
<div class="wrapper" :data-open="state === 'open' ? 1 : 0">
  <div class="bg" @click="() => setState('half')"></div>
  <div
    ref="card"
    class="card"
    :data-state="isMove ? 'move' : state"
    :style="{ transform: `translateY(${isMove ? y : calcY()}px)`, 'max-height': maxHeight }"
  >
    <div class="pan-area" ref="pan">
      <div class="bar" ref="bar"></div>
    </div>
    <div class="contents" :class="{isScrollable}" ref="content">
        <slot></slot>
    </div>
  </div>
</div>
</template>

<script>
import Hammer from 'hammerjs'

export default {
  props: {
    openY: {
      type: Number,
      default: 0.2
    },
    halfY: {
      type: Number,
      default: 100
    },
    defaultState: {
      type: String,
      default: 'close'
    }
  },
  data () {
    return {
      mc: null,
      y: 0,
      startY: 0,
      isMove: false,
      state: this.defaultState,
      rect: {},
      maxHeight: null,
      viewportHeight: 0,
      isBidScroll: false
    }
  },
  mounted () {
    window.onresize = () => {
      this.maxHeight = `${(1 - this.openY) * window.innerHeight}px`
      this.viewportHeight = window.innerHeight
    }
    // card 在css設定上，一開始是100vh，雖然後面有透過設定style更改height，但在這邊style assign還沒生效，所以獲得的高度就是整個視窗的高度(100vh)
    // this.cardHeight = this.$refs.card.clientHeight

    // https://tutorial.tips/how-to-get-viewport-width-and-height-using-javascript/
    this.maxHeight = `${(1 - this.openY) * window.innerHeight}px`
    this.viewportHeight = window.innerHeight

    this.mc = new Hammer(this.$refs.pan)
    this.mc.get('pan').set({ direction: Hammer.DIRECTION_ALL })

    this.mc.on('panup pandown', (evt) => {
      if (this.startY + evt.deltaY - (window.innerHeight - this.$refs.card.clientHeight) < 0) return
      this.y = evt.center.y - 16
    })

    this.mc.on('panstart', (evt) => {
      this.startY = evt.center.y
      this.isMove = true
    })

    this.mc.on('panend', (evt) => {
      this.isMove = false

      switch (this.state) {
        case 'half':
          if (this.startY - evt.center.y > 120) {
            this.setState('open')
          }

          if (this.startY - evt.center.y < -50) {
            this.setState('close')
          }
          break
        case 'open':
          if (this.startY - evt.center.y < -120) {
            this.setState('half')
          }
          break
      }
    })

    this.card = new Hammer(this.$refs.card)
    this.card.get('pan').set({ direction: Hammer.DIRECTION_ALL })

    this.card.on('panstart', (evt) => {
      this.startY = this.y
      // 在overflow: hidden的element裡面scroll，只會有panstart的事件，不會有panend的事件，所以就沒辦法取消isMove
      if (!this.isScrollable) {
        this.isMove = true
      }
      this.isBidScroll = false
    })

    this.card.on('panup', (evt) => {
      if (evt.deltaY < -30) {
        if (this.startY + evt.deltaY - (window.innerHeight - this.$refs.card.clientHeight) < 0) return
        this.y = this.startY + evt.deltaY
      }
    })

    this.card.on('pandown', (evt) => {
      if (evt.deltaY > 30) {
        this.y = this.startY + evt.deltaY
      } else if (this.state === 'open' && this.$refs.content.scrollTop === 0) {
        this.isBidScroll = true
      }
    })

    this.card.on('panend', (evt) => {
      this.isMove = false
      switch (this.state) {
        case 'half':
          if (this.startY - evt.center.y > 50) {
            this.setState('open')
          }

          if (this.startY - evt.center.y < -50) {
            this.setState('close')
          }
          break
        case 'open':
          if (this.y > this.$refs.card.clientHeight / 2 && this.$refs.content.scrollTop === 0) {
          // if (this.startY - evt.center.y < -120) {
            this.setState('half')
          }
          break
      }
    })
  },
  beforeDestroy () {
    this.mc.destroy()
    window.onresize = null
  },
  methods: {
    calcY () {
      switch (this.state) {
        case 'close':
          return this.viewportHeight
        case 'open':
          this.y = this.viewportHeight * this.openY
          return this.y
        case 'half':
          this.y = this.viewportHeight - this.halfY
          this.$refs.content.scrollTop = 0
          return this.y
        default:
          return this.y
      }
    },
    setState (state) {
      this.state = state
      this.$emit('change', this.state)
    },
    resetScrollTop () {
      this.$refs.content.scrollTop = 0
    }
  },
  computed: {
    isScrollable () {
      return this.state === 'open' && !this.isBidScroll
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper[data-open="1"] {
  position: fixed;
  top: 0;
  left: 0;
}

.wrapper[data-open="1"] .bg {
  display: block;
  transition: all .3s;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .3);
}

.card {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  background: white;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 -3px 4px rgba(0, 0, 0, .1);
  top: 0;
  left: 0;
}

.card[data-state="half"], .card[data-state="open"], .card[data-state="close"] {
  transition: top .3s ease-out, transform .3s ease-out;
}

.card[data-state="close"] {
  box-shadow: none;
}

.bar {
  width: 45px;
  height: 8px;
  border-radius: 14px;
  background: rgba(0, 0, 0, .3);
  margin: 0 auto;
  cursor: pointer;
}

.pan-area {
  padding: 12px 0;
}

.contents {
  flex: 1;
  overflow: hidden;
  height: 100%;
}

// solve problem of using hammerjs will block element's vertical scrolling
// refer1: https://medium.com/developer-rants/what-to-do-when-hammerjs-is-blocking-scrolling-on-mobile-9f79b460ac84
// refer2: https://stackoverflow.com/questions/33871606/vertical-scrolling-blocked-by-hammer-js
.contents.isScrollable {
  overflow-y: scroll !important;
  touch-action: pan-y !important;
}
</style>
<style>
.contents.ps--active-y .ps__rail-x,
.contents.ps--active-y .ps__rail-y {
  position: absolute;
}
</style>
