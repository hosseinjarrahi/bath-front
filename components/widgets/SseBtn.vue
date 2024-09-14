<template>
  <v-btn
    class="ml-2"
    icon
    :class="{ primary: autoRefresh }"
    @click="autoRefresh = !autoRefresh"
  >
    <v-icon small>fal fa-refresh</v-icon>
  </v-btn>
</template>

<script>
import { initSSE } from '@/helpers/helpers'

export default {
  props: {
    route: {},
    callback: { default: () => {} },
  },

  data() {
    return {
      autoRefresh: true,
    }
  },

  mounted() {
    if (window.sse && 'close' in window.sse) {
      window.sse.close()
    }

    initSSE.call(this, this.route, (data) => {
      if (this.autoRefresh) {
        this.$store.dispatch('dynamic/reloadMainData')
        try {
          this.callback(data)
        } catch (e) {}
      }
    })
  },
}
</script>
