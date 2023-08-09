<template>
  <div id="map-view">
    <v-app-bar :elevation="4" color="primary" clipped-left dark app>
      <v-toolbar-title>台灣水井地圖 & 預約取水服務</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-if="$vuetify.breakpoint.smAndUp" id="side-panel" :width="400" :elevation="4"
      mobile-breakpoint="sm" disable-resize-watcher permanent clipped app>
      <div v-if="well" ref="sidePanelContent" class="side-panel-content">
        <WellInfo :well="well" class="pt-3" />
      </div>
      <div v-else class="side-panel-content d-flex flex-column justify-center align-center text-subtitle-1 font-weight-bold">
        <v-icon color="primary" :size="80">mdi-water</v-icon>
        <div class="my-3">哈囉~ 要預約取水嗎？</div>
        <div>在地圖上選擇你附近的水井吧</div>
      </div>
    </v-navigation-drawer>
    <v-main>
      <GmapMap id="google-map" ref="map" :options="mapAttrs.options" :center="mapAttrs.center" :zoom="mapAttrs.zoom">
        <GmapMarker :key="index" v-for="(well, index) in wells" :position="well.position" :icon="well.icon" :clickable="true" @click="onSelectWell(well)" />
        <GmapMarker v-if="user.position && user.icon" :position="user.position" :icon="user.icon" />
      </GmapMap>
      <swipeable-bottom-sheet v-if="$vuetify.breakpoint.xsOnly" ref="bottomSheet" @change="onBottomSheetStateChange">
        <WellInfo :well="well" />
      </swipeable-bottom-sheet>
      <v-fab-transition v-if="isFabBtnShow && user.position">
        <v-btn @click="onPanToMyPosition" fixed bottom right fab>
          <v-icon>mdi-crosshairs-gps</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-main>
  </div>
</template>

<script>
// import { SwipeableBottomSheet } from 'vue-swipeable-bottom-sheet'
import SwipeableBottomSheet from '@/components/SwipeableBottomSheet.vue'
import WellInfo from '@/components/WellInfo.vue'
import wells from '@/data/wells.json'
import { gmapApi } from 'vue2-google-maps'
import * as url from '@/assets/well-64.png'

const mapAttrs = {
  center: { lat: 25.0214419, lng: 121.5280195 },
  options: {
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: true,
    rotateControl: false,
    fullscreenControl: false,
    disableDefaultUI: true,
    // https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.gestureHandling
    gestureHandling: 'greedy'
  },
  zoom: 10
}

export default {
  name: 'Map',
  data: () => ({
    posWatcherID: null,
    position: null,
    mapAttrs,
    well: null,
    isFabBtnShow: true
  }),
  created () {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => (this.position = position)
      )
      this.posWatcherID = navigator.geolocation.watchPosition(
        position => (this.position = position)
      )
    }
  },
  destroyed () {
    if ('geolocation' in navigator && this.posWatcherID) {
      navigator.geolocation.clearWatch(this.posWatcherID)
    }
  },
  methods: {
    onPanToMyPosition () {
      this.$refs.map.$mapPromise.then(map => {
        map.setZoom(12)
        map.panTo(this.user.position)
      })
    },
    onSelectWell (well) {
      this.well = well
      if (this.$refs.bottomSheet) {
        this.$refs.bottomSheet.setState('half')
        this.$refs.bottomSheet.resetScrollTop()
      }
      if (this.$refs.sidePanelContent) {
        this.$refs.sidePanelContent.scrollTop = 0
      }
      this.$refs.map.$mapPromise.then(map => {
        map.setZoom(15)
        map.panTo(well.position)
      })
    },
    onBottomSheetStateChange (state) {
      this.isFabBtnShow = state === 'close'
    }
  },
  computed: {
    google: gmapApi,
    user () {
      const position = this.position ? {
        lat: this.position.coords.latitude,
        lng: this.position.coords.longitude
      } : null

      const icon = this.google ? {
        path: this.google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: '#4285f6',
        fillOpacity: 1,
        strokeColor: '#fff',
        strokeWeight: 3
      } : null

      return {
        position,
        icon
      }
    },
    wells () {
      return wells.map(well => {
        well.position = { lat: well['緯度'], lng: well['經度'] }
        if (this.google) {
          well.icon = {
            url,
            scaledSize: new this.google.maps.Size(35, 35), // scaled size
            origin: new this.google.maps.Point(0, 0), // origin
            anchor: new this.google.maps.Point(17, 35) // anchor
          }
        }
        return well
      })
    }
  },
  components: {
    WellInfo,
    SwipeableBottomSheet
  }
}
</script>
<style lang="scss" scoped>
#side-panel .side-panel-content {
  height: 100%;
  overflow: auto;
}

#google-map {
  width: 100%;
  // app bar高48px
  height: calc(100vh - 64px);
}
</style>
<style>
#calendar.v-calendar.v-calendar-daily .v-calendar-daily__head > .v-calendar-daily_head-day > .v-calendar-daily_head-day-label > .v-btn.v-btn--fab {
  height: 30px;
  width: 30px;
}
</style>
